window.onload = function () {
    let main = document.getElementById('main');
    let excel = document.getElementsByClassName('excel');

    let tetris = document.createElement('div');

    //массив с фигурками для игры в тетрис
    let mainArr = [
        //палка
        [
            [0, 1],
            [0, 2],
            [0, 3]
        ],
        //квадрат
        [
            [1, 0],
            [0, 1],
            [1, 1]
        ]
    ];
    //пустой массив рандомных отображаемых фигурок
    let figureBody = [];

    let addClassToElements = (elem, className) => elem.classList.add(className);
    let appendElements = (parentElem, childElem) => parentElem.appendChild(childElem);
    let appendExelElements = (parentElem = tetris) => {
        for (let i = 180; i > 0; i--) {
            let excel = document.createElement('div');
            addClassToElements(excel, 'excel');
            parentElem.appendChild(excel);
        }
    };
    let addPositionArrtToElem = (elem = excel) => {
        let i = 0;
        for (let y = 18; y > 0; y--) {
            for (let x = 1; x < 11; x++) {
                elem[i].setAttribute('posX', x);
                elem[i].setAttribute('posY', y);
                i++;
            }
        }
    }


    //функция рандомного значения
    let getRandom = (array) => Math.round(Math.random() * (array.length - 1));
    //функция для создания фигурок для тетриса, принимает стартовые значения по оси X и Y
    let createFigureForTetris = (x, y) => {
        // локальная переменная с рандомным числом
        let currentFigure = getRandom(mainArr);
        //наполняю массив в котором храняться рандомные фигурки
        figureBody = [
            document.querySelector(`[posX = "${x}"][posY = "${y}"]`),  //координаты для первой ячейки фигурки
            document.querySelector(`[posX = "${x + mainArr[currentFigure][0][0]}"][posY = "${y + mainArr[currentFigure][0][1]}"]`),
            document.querySelector(`[posX = "${x + mainArr[currentFigure][1][0]}"][posY = "${y + mainArr[currentFigure][1][1]}"]`),
            document.querySelector(`[posX = "${x + mainArr[currentFigure][2][0]}"][posY = "${y + mainArr[currentFigure][2][1]}"]`),
        ]
    };
    //присваиваю класс для каждой ячейки созданной фигуроки
    let addFigureClass = (figure = figureBody) => {
        for (let i = 0; i < figure.length; i++) {
            figure[i].classList.add('figure');
        }
    }









    addClassToElements(tetris, 'tetris');
    appendElements(main, tetris);
    appendExelElements();
    addPositionArrtToElem();
    createFigureForTetris(5, 10);
    addFigureClass();

};



