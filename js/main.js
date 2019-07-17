window.onload = function () {
    let overlay = document.querySelector('.overlay');
    let modal = document.querySelector('.modal');
    let speed = 0;

    //функция для выбора уровня сложности
    function getChoosingLevel (elem = modal) {
        modal.addEventListener('click', function (e) {
            let click = e.target;
            let easy = click.classList.contains('easy');
            let normal = click.classList.contains('normal');
            let hard = click.classList.contains('hard');
            let buttons = click.classList.contains('button');
            speed = (easy) ? 800 : (normal) ? 500 : (hard) ? 250: 0;
            if (buttons) {
                modal.style.display = 'none';
                overlay.style.display = 'none';
                startGame();
            }
        });
    };

    // функция со всей логикой игры
    function startGame() {
        let mainArr = [[[0, 1], [0, 2], [0, 3], [[-1, 1], [0, 0], [1, -1], [2, -2]], [[1, -1], [0, 0], [-1, 1], [-2, 2]], [[-1, 1], [0, 0], [1, -1], [2, -2]], [[1, -1], [0, 0], [-1, 1], [-2, 2]]], [[1, 0], [0, 1], [1, 1], [[0, 0], [0, 0], [0, 0], [0, 0]], [[0, 0], [0, 0], [0, 0], [0, 0]], [[0, 0], [0, 0], [0, 0], [0, 0]], [[0, 0], [0, 0], [0, 0], [0, 0]]], [[1, 0], [0, 1], [0, 2][[0, 0], [-1, 1], [1, 0], [2, -1]], [[1, -1], [1, -1], [-1, 0], [-1, 0]], [[-1, 0], [0, -1], [2, -2], [1, -1]], [[0, -1], [0, -1], [-2, 0], [-2, 0]]], [[1, 0], [1, 1], [1, 2], [[0, 0], [0, 0], [1, -1], [-1, -1]], [[0, -1], [-1, 0], [-2, 1], [1, 0]], [[2, 0], [0, 0], [1, -1], [1, -1]], [[-2, 0], [1, -1], [0, 0], [-1, 1]]], [[1, 0], [1, 1], [2, 1], [[2, -1], [0, 0], [1, -1], [-1, 0]], [[-2, 0], [0, -1], [-1, 0], [1, -1]], [[2, -1], [0, 0], [1, -1], [-1, 0]], [[-2, 0], [0, -1], [-1, 0], [1, -1]]], [[1, 0], [-1, 1], [0, 1], [[0, -1], [-1, 0], [2, -1], [1, 0]], [[0, 0], [1, -1], [-2, 0], [-1, -1]], [[0, -1], [-1, 0], [2, -1], [1, 0]], [[0, 0], [1, -1], [-2, 0], [-1, -1]]], [[1, 0], [2, 0], [1, 1], [[1, -1], [0, 0], [0, 0], [0, 0]], [[0, 0], [-1, 0], [-1, 0], [1, -1]], [[1, -1], [1, -1], [1, -1], [0, 0]], [[-2, 0], [0, -1], [0, -1], [-1, -1]]],]
        let x = 5, y = 15;
        let currentFigure = 0;
        let figureBody = 0;
        let rotate = 1;
        let score = 0;
        let flag = true;
        let tetris = document.createElement('div');
        tetris.classList.add('tetris');
        let main = document.getElementsByClassName('main')[0];
        let excel = document.getElementsByClassName('excel');
        let input = document.getElementsByTagName('input')[0];
        input.value = `Ваши очки : ${score}`;
        let interval = setInterval(() => movingFigure(), speed);
        let addPositionArrtToElem = (elem = excel) => {
            let i = 0;
            for (let y = 18; y > 0; y--) {
                for (let x = 1; x < 11; x++) {
                    elem[i].setAttribute('posX', x);
                    elem[i].setAttribute('posY', y);
                    i++;
                }
            }
        };
        //функция рандомного значения
        let getRandom = (array) => Math.round(Math.random() * (array.length - 1));

        for (let i = 1; i < 181; i++) {
            let excel = document.createElement('div');
            excel.classList.add('excel');
            tetris.appendChild(excel);
        }
        main.appendChild(tetris);

        //функция для создания фигурок для тетриса, принимает стартовые значения по оси X и Y
        function createNewFigure() {
            rotate = 1;
            currentFigure = getRandom(mainArr);

            figureBody = [
                document.querySelector(`[posX = "${x}"][posY = "${y}"]`),
                document.querySelector(`[posX = "${x + mainArr[currentFigure][0][0]}"][posY = "${y + mainArr[currentFigure][0][1]}"]`),
                document.querySelector(`[posX = "${x + mainArr[currentFigure][1][0]}"][posY = "${y + mainArr[currentFigure][1][1]}"]`),
                document.querySelector(`[posX = "${x + mainArr[currentFigure][2][0]}"][posY = "${y + mainArr[currentFigure][2][1]}"]`),
            ]
            let addFigureClass = (figure = figureBody) => figure.forEach(item => item.classList.add('figure'));
        }

        // функция для логики движения фигурки в тетрисе
        function movingFigure() {
            let moveFlag = true;
            let coordinates = [
                [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')],
                [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')],
                [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')],
                [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')],
            ];

            coordinates.forEach((figure) => {
                if (figure[1] == 1 || document.querySelector(`[posX = "${figure[0]}"][posY = "${figure[1] - 1}"]`).classList.contains('set')) {
                    moveFlag = false;
                }
            });

            if (moveFlag) {
                figureBody.forEach(item => item.classList.remove('figure'));
                figureBody = [
                    document.querySelector(`[posX = "${coordinates[0][0]}"][posY = "${coordinates[0][1] - 1}"]`),
                    document.querySelector(`[posX = "${coordinates[1][0]}"][posY = "${coordinates[1][1] - 1}"]`),
                    document.querySelector(`[posX = "${coordinates[2][0]}"][posY = "${coordinates[2][1] - 1}"]`),
                    document.querySelector(`[posX = "${coordinates[3][0]}"][posY = "${coordinates[3][1] - 1}"]`),
                ];
                figureBody.forEach(item => item.classList.add('figure'));
            }
            else {
                figureBody.forEach((item) => {
                    item.classList.remove('figure');
                    item.classList.add('set');
                })
                //удаляем заполненый ряд
                for (let i = 1; i < 15; i++) {
                    //переменная в которой хнаниться заполненное количество ячеек в ряд
                    let count = 0;
                    for (let k = 1; k < 11; k++) {
                        //если в один ряд сложилось несколько элементов то счётчик инкрементируется
                        if (document.querySelector(`[posX = "${k}"][posY = "${i}"]`).classList.contains('set')) {
                            count++;
                            // если счётчик равен 10 то удаляем класс сет
                            if (count == 10) {
                                score += 10;
                                input.value = `Ваши очки : ${score}`;
                                //проходимся по всему ряду
                                for (let m = 1; m < 11; m++) {
                                    //удаляем в этом руду ячейки с классом сет
                                    document.querySelector(`[posX = "${m}"][posY = "${i}"]`).classList.remove('set');
                                }
                                //переменная для все ячеек с классом сет
                                let set = document.querySelectorAll('.set');
                                //пустой массив для новых позиций для ячеек с классом сет
                                let newSet = [];
                                //проходимся по всем ячейчас с классм сет
                                for (let s = 0; s < set.length; s++) {
                                    // переменная с координатами ячейки
                                    let setCoordinates = [set[s].getAttribute('posX'), set[s].getAttribute('posY')];
                                    //если координаты ячейки больше чем 1
                                    if (setCoordinates[1] > i) {
                                        //удаляю класс сет
                                        set[s].classList.remove('set');
                                        //пушу в массив с новыми координатами
                                        newSet.push(document.querySelector(`[posX = "${setCoordinates[0]}"][posY = "${setCoordinates[1] - 1}"]`));
                                    }
                                }
                                // ячейкам из массива с новыми координатами добавляю класс сет
                                newSet.forEach(item => { item.classList.add('set')})
                                i--;
                            }
                        }
                    }
                }
                ;

                //логика для окончании игры (как только фигуры останавливается на 15 ряду
                // (вершний ряд), игра останавливается
                for (let n = 1; n < 11; n++) {
                    //если ячейка позиции Y находится на 15 ряду
                    if (document.querySelector(`[posX = "${n}"][posY = "15"]`).classList.contains('set')) {
                        clearInterval(interval);
                        alert(`Игра окончена. Ваши очки: ${score}`);
                        break;
                    }
                }

                createNewFigure();
            }
        }

        //логика для управления фигурками
        function getTetrisControl() {
            window.addEventListener('keydown', function (e) {
                let coordinates1 = [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')];
                let coordinates2 = [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')];
                let coordinates3 = [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')];
                let coordinates4 = [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')];
                let figureNew = [
                    document.querySelector(`[posX = "${+coordinates1[0] + mainArr[currentFigure][rotate + 2][0][0]}"][posY = "${
                    +coordinates1[1] + mainArr[currentFigure][rotate + 2][0][1]}"]`),
                    document.querySelector(`[posX = "${+coordinates2[0] + mainArr[currentFigure][rotate + 2][1][0]}"][posY = "${
                    +coordinates2[1] + mainArr[currentFigure][rotate + 2][1][1]}"]`),
                    document.querySelector(`[posX = "${+coordinates3[0] + mainArr[currentFigure][rotate + 2][2][0]}"][posY = "${
                    +coordinates3[1] + mainArr[currentFigure][rotate + 2][2][1]}"]`),
                    document.querySelector(`[posX = "${+coordinates4[0] + mainArr[currentFigure][rotate + 2][3][0]}"][posY = "${
                    +coordinates4[1] + mainArr[currentFigure][rotate + 2][3][1]}"]`),
                ];

                // функция принимает в себя технический параметр a, равный либо 1, либо -1, в зависимости от того какую клавишу мы нажмём на клавиатуре
                function getNewState(a) {
                    flag = true;
                    let figureNew = [
                        document.querySelector(`[posX = "${+coordinates1[0] + a}"][posY = "${coordinates1[1]}"]`),
                        document.querySelector(`[posX = "${+coordinates2[0] + a}"][posY = "${coordinates2[1]}"]`),
                        document.querySelector(`[posX = "${+coordinates3[0] + a}"][posY = "${coordinates3[1]}"]`),
                        document.querySelector(`[posX = "${+coordinates4[0] + a}"][posY = "${coordinates4[1]}"]`),
                    ];

                    figureNew.forEach(item => {
                        if (!item || item.classList.contains('set')) {
                            flag = false;
                        }
                    });

                    if (flag) {
                        figureBody.forEach(item =>  item.classList.remove('figure'));
                        figureBody = figureNew;
                        figureBody.forEach(item =>  item.classList.add('figure'));
                    }
                }

                if (e.keyCode == 37) { //keyCode == 37 - стрелка влево
                    getNewState(-1);
                } else if (e.keyCode == 39) { //keyCode == 39 - стрелка вправо
                    getNewState(1);
                } else if (e.keyCode == 40) { //keyCode == 40 - стрелка вниз
                    movingFigure();
                } else if (e.keyCode == 38) { //keyCode == 38 - стрелка вверх
                    flag = true;
                    figureNew.forEach((item) => {
                        if (!item || item.classList.contains('set')) {
                            flag = false;
                        }
                    })
                    if (flag) {
                        figureBody.forEach((item) => { item.classList.remove('figure') });
                        figureBody = figureNew;
                        figureBody.forEach((item) => { item.classList.add('figure') });

                        if (rotate < 4) {
                            rotate++;
                        } else {
                            rotate = 1;
                        }
                    }
                }
            })
        }

        addPositionArrtToElem();
        createNewFigure();
        getTetrisControl();
    };
    getChoosingLevel();
}

