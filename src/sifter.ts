/**
 * The data of studying word
 *
 */
interface WordData {
    word: string;
    translation: string;
}

export class WordSifter {
    private wordToTranslateDelimiter = '.............'
    private withTranslate: boolean = null;
    private isStudiedWords: boolean = true;

    siftWords(): void {
        // this.isStudiedWords
        //     = confirm('Do you want to get studied words(yes - studied, no - ignored)?')
        this.withTranslate = confirm('Do want to add translation to words?')
        let words = this.findWordsOnPage(this.isStudiedWords);

        this.saveFile(
            this.createFileData(words)
        )
    }

    private findWordsOnPage(isStudied: boolean): WordData[] {
        const allNodes = document.body.querySelectorAll('.text-text');
        let nodes = Array
            .from(allNodes)
            .filter((node) => {
                    const containsIgnoredClass = node.classList.contains('ignored');
                    return isStudied ? !containsIgnoredClass : containsIgnoredClass
                }
            );

        return Array
            .from(nodes)
            .map((node: Element) => {
                return {
                    word: this.findWordOrTranslate(node as any as Element),
                    translation: this.findWordOrTranslate(node as any as Element, true)
                }
            });
    }

    private findWordOrTranslate(node: Element, translation = false): string {
        const selector = `.col_${translation ? 'b' : 'a'} .text`
        return (node.querySelector(selector) as HTMLDivElement).innerText.toLowerCase();
    }

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

    private saveFile(fileData: string) {
        const a = document.createElement('a');
        a.href = fileData;
        a.download = this.createFileName();
        a.click();
    }

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
