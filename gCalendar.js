export default (function () {

    function create(params) {

        const today = new Date();

        const argDefault = {
            day: today.getDate(),
            month: today.getMonth(),
            year: today.getFullYear()
        }

        var arg = Object.assign(argDefault, params);

        let ax = {

            element: undefined,
            table: undefined,
            thead: undefined,
            tbody: undefined,
            month: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            week: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
            days: {},

            setMain() {
                this.element = document.createElement('div');
                this.element.classList = 'auto-gCalendar gCalendar material-theme';
                this.table = document.createElement('table');
                this.thead = document.createElement('thead');
                this.tbody = document.createElement('tbody');
                this.element.appendChild(this.table);
                this.table.appendChild(this.thead);
                this.table.appendChild(this.tbody);
            },

            createTitle() {

                let tr = document.createElement('tr');
                tr.classList.add('gCalendar-title-row')
                this.thead.appendChild(tr);

                let th = document.createElement('th');
                th.classList.add('gCalendar-title')
                th.setAttribute('colspan', 7);
                tr.appendChild(th);

                let divLeft = document.createElement('div');
                divLeft.classList.add('gCalendar-title-left');
                th.appendChild(divLeft)

                let divNavLeft = document.createElement('div');
                divNavLeft.classList.add('gCalendar-nav-left');
                divLeft.appendChild(divNavLeft);

                let divCenter = document.createElement('div');
                divCenter.classList.add('gCalendar-title-name');
                divCenter.innerHTML = this.month[argDefault.month] + ' - ' + arg.year;
                th.appendChild(divCenter);

                let divRight = document.createElement('div');
                divRight.classList.add('gCalendar-title-right');
                th.appendChild(divRight);

                let divNavRight = document.createElement('div');
                divNavRight.classList.add('gCalendar-nav-right');
                divRight.appendChild(divNavRight);

            },

            createWeeks() {

                let tr = document.createElement('tr');
                tr.classList.add('gCalendar-week-days')
                this.thead.appendChild(tr);

                this.week.forEach(element => {
                    let th = document.createElement('th');
                    th.innerText = element.split('')[0];
                    tr.appendChild(th);
                });

            },

            createDays() {
                let count = 0;
                for (let week = 0; week < 6; week++) {
                    let tr = document.createElement('tr');

                    for (let d = 0; d <= 6; d++) {
                        let td = document.createElement('td');       
                        ax.days[count] = td;
                        tr.appendChild(td);
                        count++;
                    }

                    ax.tbody.appendChild(tr);
                }
            },

            update(date){
                let firstDayWeek = new Date(date.getFullYear(), date.getMonth(), 1).getUTCDay();
                let lastDay = new Date(date.getFullYear(),date.getMonth()+1,0).getDate() + firstDayWeek - 1;
                for(let i=0; i<42; i++){
                    if(i < firstDayWeek)
                        ax.days[i].innerHTML = '';
                    else if(i > lastDay)
                        ax.days[i].innerHTML = '';
                    else
                        ax.days[i].innerHTML = i - firstDayWeek + 1;
                }
            },

            append() {
                document.body.append(this.element);
            }

        }

        ax.setMain();
        ax.createTitle();
        ax.createWeeks();
        ax.createDays();
        ax.update(today);
        ax.append();

    };

    return {
        create: create,
    }

})();