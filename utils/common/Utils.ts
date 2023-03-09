const Capitalize = (word: string) => {
    const firstLetter = word.charAt(0);
    const firstLetterCap = firstLetter.toUpperCase();
    const remainingLetters = word.slice(1);

    const capitalizedWord = firstLetterCap + remainingLetters;

    return capitalizedWord;
};

const generateNameLetter = (fullname: string) => {
    const nameList = fullname.split(' ');
    const nameLetter = nameList.map((name, i) => {
        if (i > 1) return;
        return name.charAt(0).toUpperCase();
    });

    return nameLetter.join(' ');
};

const getLastword = (sentence: string) => {
    const wordList = sentence.split(' ');
    const lastIndex = wordList.length - 1;
    return wordList[lastIndex];
};

const getCookie = (cname: string) => {
    let name = cname + '=';
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
};

const generateRandomColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);

    return `#${randomColor}`;
};
export const Utils = {
    Capitalize,
    getLastword,
    getCookie,
    generateNameLetter,
    generateRandomColor,
};
