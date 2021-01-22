/******/ (() => { // webpackBootstrap
    /******/ 	"use strict";

    ;// CONCATENATED MODULE: ./src/sifter.ts
    class WordSifter {
        constructor() {
            this.wordToTranslateDelimiter = '.............';
            this.withTranslate = null;
            this.isStudiedWords = true;
        }
        siftWords() {
            // this.isStudiedWords
            //     = confirm('Do you want to get studied words(yes - studied, no - ignored)?')
            this.withTranslate = confirm('Do want to add translation to words?');
            let words = this.findWordsOnPage(this.isStudiedWords);
            this.saveFile(this.createFileData(words));
        }
        findWordsOnPage(isStudied) {
            const allNodes = document.body.querySelectorAll('.text-text');
            let nodes = Array
                .from(allNodes)
                .filter((node) => {
                    const containsIgnoredClass = node.classList.contains('ignored');
                    return isStudied ? !containsIgnoredClass : containsIgnoredClass;
                });
            return Array
                .from(nodes)
                .map((node) => {
                    return {
                        word: this.findWordOrTranslate(node),
                        translation: this.findWordOrTranslate(node, true)
                    };
                });
        }
        findWordOrTranslate(node, translation = false) {
            const selector = `.col_${translation ? 'b' : 'a'} .text`;
            return node.querySelector(selector).innerText.toLowerCase();
        }
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
        saveFile(fileData) {
            const a = document.createElement('a');
            a.href = fileData;
            a.download = this.createFileName();
            a.click();
        }
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
