
    // определяю в переменную елемент страницы
    let main = document.getElementById('main');
    let excel = document.getElementsByClassName('excel');

    //вспомогательная переменная
    let i = 0;

    //создаю элементы
    let tetris = document.createElement('div');

    //добавляю классы
    tetris.classList.add('tetris');

    // в елемент "тетрис" добавляю елементы "эксель"
    let addExelElements = (a = tetris) => {
        for (let i = 180; i > 0; i--) {
            let excel = document.createElement('div');
            excel.classList.add('excel');
            a.appendChild(excel);
        }
    };
    addExelElements();

    main.appendChild(tetris);

    //каждой ячейке присваиваю позицию по осям X, Y
    let addArrtExcel = () => {
        for (let y = 18; y > 0; y--) {
            for (let x = 1; x < 11; x++) {
                excel[i].setAttribute('posX', x);
                excel[i].setAttribute('posY', y);
                i++;
            }
        }
    }
    addArrtExcel();



