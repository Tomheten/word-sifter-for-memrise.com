/**
 * The data of studying word
 */
interface WordData {
    word: string;
    translation: string;
}

/**
 * The word sifter for memrise.com
 */
export class WordSifter {
    private wordToTranslateDelimiter = '.............'
    private withTranslate: boolean = null;

    /**
     * Sifts words from a current page
     */
    siftWords(): void {
        this.withTranslate = confirm('Do want to add translation to words?')
        let words = this.findWordsOnPage();

        this.saveFile(
            this.createFileData(words)
        )
    }

    /**
     * Finds a data of learned words
     * @private
     * @return {WordData} data of learned words
     */
    private findWordsOnPage(): WordData[] {
        const nodes = document.body.querySelectorAll('.text-text:not(.ignored)');
        return Array
            .from(nodes)
            .map((node: Element) => this.findWordData(node));
    }

    /**
     * Finds word and its translate.
     * @param parentNode
     * @private
     */
    private findWordData(parentNode: Element): WordData {
        return {
            word: this.findInnerTextBySelector(parentNode, '.col_a .text'),
            translation: this.findInnerTextBySelector(parentNode, '.col_b .text')
        }
    }

    /**
     * Finds an inner text of as element found by a selector. A found text is lowercase.
     *
     * @param {Element} parentNode, it contains an element with an inner text.
     * @param {string} cssSelector
     * @private
     */
    private findInnerTextBySelector(parentNode: Element, cssSelector: string): string {
        return (parentNode.querySelector(cssSelector) as HTMLDivElement).innerText.toLowerCase();
    }

    /**
     * Creates data of words for saving to a file.
     *
     * @param {WordData[]} words
     * @param {boolean} sortByAlphabetical
     * @private
     */
    private createFileData(words: WordData[], sortByAlphabetical = true): string {
        if (sortByAlphabetical) {
            words.sort((first, second) => {
                return first.word > second.word ? 1 : -1;
            });
        }
        const fileData = words
            .map((e: WordData) => {
                let result = e.word;
                if (this.withTranslate) {
                    result += this.wordToTranslateDelimiter + e.translation;
                }
                return result + '\n';
            })
            .join('');
        return 'data:application/txt;charset=utf-8,' + encodeURIComponent(fileData);
    }

    /**
     * Download the file with a data of found words.
     *
     * @param fileData, it is a data of found words
     * @private
     */
    private saveFile(fileData: string) {
        const a = document.createElement('a');
        a.href = fileData;
        a.download = this.createFileName();
        a.click();
    }

    /**
     * Creates the name of the saved file. The name consists of the course
     * level and the course name from the current page.
     *
     * @private
     */
    private createFileName(): string {
        const levelNumber =
            (document.querySelector('.level-number') as HTMLDivElement).innerText;
        const levelName =
            (document.querySelector('.progress-box-title') as HTMLDivElement).innerText;
        let fileNameRaw = `${levelNumber} ${levelName}`;

        if (this.withTranslate) {
            fileNameRaw += '_translated';
        }

        return fileNameRaw.replace(' ', '_') + '.txt';
    }
}
