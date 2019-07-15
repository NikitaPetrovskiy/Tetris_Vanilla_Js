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
        ],
        //Буква L
        [
            [1, 0],
            [0, 1],
            [0, 2]
        ],
        //Отзеркаленная буква L
        [
            [1, 0],
            [1, 1],
            [1, 2]
        ],
        //молния (нижний ряд вправо)
        [
            [1, 0],
            [-1, 1],
            [0, 1]
        ],
        //молния (нижний ряд влево)
        [
            [1, 0],
            [1, 1],
            [2, 1]
        ],
        //деталь Лего
        [
            [1, 0],
            [2, 0],
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
        // for (let i = 0; i < figure.length; i++) {
        //     figure[i].classList.add('figure');
        // }
        figure.forEach((item) => {
            item.classList.add('figure');
        })
    }





    // функция для логики движения фигурки в тетрисе
    let movingFigure = () => {
        // булевое значение для движения фигурки
        let moveFlag = true;
        //координаты фигурки
        let coordinates = [
            [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')],
            [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')],
            [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')],
            [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')]
        ];

        //проверка для фигурка. Если по оси Y она в самом низу (координаты 1) или снизу фигурка имеет класс set,
        // то бул значение будет фолсе и фигурка прекратит движение
        // for (let i = 0; i < coordinates.length; i++) {
        //     if (coordinates[i][1] == 1 || document.querySelector(`[posX = "${coordinates[i][0]}"][posY = "${coordinates[i][1] - 1}"]`).classList.contains('set')) {
        //         moveFlag = false;
        //         break;
        //     }
        // }
        coordinates.forEach((body) => {
            if (body[1] == 1 || document.querySelector(`[posX = "${body[0]}"][posY = "${body[1] - 1}"]`).classList.contains('set')) {
                moveFlag = false;

            }
        })
        // если булевое значение труб
        if (moveFlag) {
            // for (let i = 0; i < figureBody.length; i++) {
            //     figureBody[i].classList.remove('figure');
            // }
            figureBody.forEach((item) => {
                item.classList.remove('figure');
            })
            figureBody = [
                document.querySelector(`[posX = "${coordinates[0][0]}"][posY = "${coordinates[0][1] - 1}"]`),
                document.querySelector(`[posX = "${coordinates[1][0]}"][posY = "${coordinates[1][1] - 1}"]`),
                document.querySelector(`[posX = "${coordinates[2][0]}"][posY = "${coordinates[2][1] - 1}"]`),
                document.querySelector(`[posX = "${coordinates[3][0]}"][posY = "${coordinates[3][1] - 1}"]`)
            ];
            // for (let i = 0; i < figureBody.length; i++) {
            //     figureBody[i].classList.add('figure');
            // }
            figureBody.forEach((item) => {
                item.classList.add('figure');
            })
        } else {
            // for (let i = 0; i < figureBody.length; i++) {
            //     figureBody[i].classList.remove('figure');
            //     figureBody[i].classList.add('set');
            // }
            figureBody.forEach((item) => {
                item.classList.remove('figure');
                item.classList.add('set');
            })
            createFigureForTetris(5, 15);
        }
    };
    let interval = setInterval(() => {
        movingFigure();
    }, 300);


    //логика для управления фигурками
    window.addEventListener('keydown', function (e) {
        //переменные для каждого координата
        let coordinates1 = [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')];
        let coordinates2 = [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')];
        let coordinates3 = [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')];
        let coordinates4 = [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')];


        //функция для определения новых координат для фигурки
        let getNewState = (a) => {
            //вспомогательная переменная
            let flag = true;
            //переменная для новых координатов для фигурки
            let figureNew = [
                document.querySelector(`[posX = "${+coordinates1[0] + a }"][posY = "${coordinates1[1]}"]`),
                document.querySelector(`[posX = "${+coordinates2[0] + a }"][posY = "${coordinates2[1]}"]`),
                document.querySelector(`[posX = "${+coordinates3[0] + a }"][posY = "${coordinates3[1]}"]`),
                document.querySelector(`[posX = "${+coordinates4[0] + a }"][posY = "${coordinates4[1]}"]`),
            ];

            // for (let i = 0; i < figureNew.length; i++) {
            //     if (!figureNew[i] || figureNew[i].classList.contains('set')) {
            //         flag = false;
            //     }
            //     if (flag) {
            //         for (let i = 0; i < figureBody.length; i++) {
            //             figureBody[i].classList.remove('figure');
            //         }
            //         figureBody = figureNew;
            //         for (let i = 0; i < figureBody.length; i++) {
            //             figureBody[i].classList.add('figure');
            //         }
            //     }
            // }
            figureNew.forEach((item) => {
                if (!item || item.classList.contains('set')) {
                    flag = false;
                }
                if (flag) {
                    figureBody.forEach((i) => {
                        i.classList.remove('figure');
                    })
                    figureBody = figureNew;
                    figureBody.forEach((it) => {
                        it.classList.add('figure');
                    })
                }
            });
        };

        if (e.keyCode === 37) {
            getNewState(-1);
        } else if (e.keyCode === 39) {
            getNewState(1);
        } else if (e.keyCode === 40) {
            movingFigure();
        }
    });




    addClassToElements(tetris, 'tetris');
    appendElements(main, tetris);
    appendExelElements();
    addPositionArrtToElem();
    createFigureForTetris(5, 15);
    addFigureClass();


};



