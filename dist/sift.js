/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// CONCATENATED MODULE: ./src/sifter.ts
/**
 * The word sifter for memrise.com
 */
class WordSifter {
    constructor() {
        this.wordToTranslateDelimiter = '.............';
        this.withTranslate = null;
    }
    /**
     * Sifts words from a current page
     */
    siftWords() {
        this.withTranslate = confirm('Do want to add translation to words?');
        let words = this.findWordsOnPage();
        this.saveFile(this.createFileData(words));
    }
    /**
     * Finds a data of learned words
     * @private
     * @return {WordData} data of learned words
     */
    findWordsOnPage() {
        const nodes = document.body.querySelectorAll('.text-text:not(.ignored)');
        return Array
            .from(nodes)
            .map((node) => this.findWordData(node));
    }
    /**
     * Finds word and its translate.
     * @param parentNode
     * @private
     */
    findWordData(parentNode) {
        return {
            word: this.findInnerTextBySelector(parentNode, '.col_a .text'),
            translation: this.findInnerTextBySelector(parentNode, '.col_b .text')
        };
    }
    /**
     * Finds an inner text of as element found by a selector. A found text is lowercase.
     *
     * @param {Element} parentNode, it contains an element with an inner text.
     * @param {string} cssSelector
     * @private
     */
    findInnerTextBySelector(parentNode, cssSelector) {
        return parentNode.querySelector(cssSelector).innerText.toLowerCase();
    }
    /**
     * Creates data of words for saving to a file.
     *
     * @param {WordData[]} words
     * @param {boolean} sortByAlphabetical
     * @private
     */
    createFileData(words, sortByAlphabetical = true) {
        if (sortByAlphabetical) {
            words.sort((first, second) => {
                return first.word > second.word ? 1 : -1;
            });
        }
        const fileData = words
            .map((e) => {
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
    saveFile(fileData) {
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
    createFileName() {
        const levelNumber = document.querySelector('.level-number').innerText;
        const levelName = document.querySelector('.progress-box-title').innerText;
        let fileNameRaw = `${levelNumber} ${levelName}`;
        if (this.withTranslate) {
            fileNameRaw += '_translated';
        }
        return fileNameRaw.replace(' ', '_') + '.txt';
    }
}

;// CONCATENATED MODULE: ./src/main.ts

const sifter = new WordSifter();
sifter.siftWords();

/******/ })()
;