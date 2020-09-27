## Введение и описание

**Schedule** — приложение, помогающее получать актуальную информацию о занятиях и заданиях курсов [RS School](https://rs.school/).

Данное расписание предназчено для студентов и менторов [RS School](https://rs.school/).

В приложении присутствует разделение на роли — **студенты** и **менторы** — которым доступны свои собственные возможности.

**Ментор** в праве изменять существующие занятия и создавать новые.

Для проведения оффлайн лекции **ментору** требуется указать место проведения, после чего маркер с указанным местоположением отобразится в окне редактиварония, а также в окне описания задания.

[![](https://i.imgur.com/jlDnufW.gif)](https://i.imgur.com/wD0DQrY.gif)

**Студенту** же доступна возможность лишь ознакамливаться с заданиями и оставлять фидбэк, если ментор дал эту возможность.

Реализовано переключение между часовыми поясами с помощью [Moment Timezone](https://github.com/moment/moment-timezone).

Создано **три** вида расписания:

1. Таблица.
2. Список.
3. Календарь.

[![](https://i.imgur.com/fxgAs4l.gif)](https://i.imgur.com/NwxfRkC.gif)

Благодаря [Reselect](https://github.com/reduxjs/reselect) создана фильтрация расписания по типам задания, а также возможность скрывать/отображать задания. Данный функционал доступен как в **табличном**, так и в **списочном** формате расписания.

[![](https://i.imgur.com/HZgwrGk.gif)](https://i.imgur.com/rqVWB4x.gif)

Возможность указывать дату дедлайна, если при создании/редактировании выбран тип **Task**.

[![](https://i.imgur.com/Up5Y9pt.gif)](https://i.imgur.com/pKTrvtU.gif)

Дизайн приложения сочетается с оформлением [RS App](https://app.rs.school/), что достигнуто благодаря использованию [Ant Design](https://github.com/ant-design/ant-design).

Наличие **Preview mode**, позволяющий ознакомиться с тем, как будет отображаться добавляемое занятие/задание в текущем виде расписания.

[![](https://i.imgur.com/iygvQcb.gif)](https://i.imgur.com/ZnuqsGt.gif)

Отображение/скрытие интересующих столбцов в расписании.

[![](https://i.imgur.com/GN88Ac9.gif)](https://i.imgur.com/neKoVJI.gif)

Реализована адаптивность для возможности просмотра расписания на любом устройстве.

Имеется возможность экспорта расписания в [Google Календарь](https://calendar.google.com/calendar/u/0/r).

## Концепция и макет

[Концепция продукта «Schedule RS School»](https://docs.google.com/document/d/1dcWYdnazG5uqli6HLwAvaHycIRl8_JBDtEqd0ifV4go/edit).

[Макет в Figma](https://www.figma.com/file/nJZ2fTBhgmI0fIlIKOutMI/Scheduler?node-id=0%3A1).

## Установка

Для того, чтобы установить все необходимые зависимости для успешного запуска приложения, следует выполнить следующие шаги:

1. Склонировать репозиторий на свой ПК.
2. Убедиться, что у Вас установлена акутальная версия Node.
3. Ввести в терминале следующую команду:

```sh
$ npm install
```

4. Убедитесь, что все зависимости были установлены корректно.

## Запуск

После успешной установки всех необходимых зависимостей, введите в терминал следующую команду:

```sh
$ npm run start
```

Если требуется собрать проект в продакшн, то воспользуйтесь данной командой:

```sh
$ npm run build
```

## Используемые технологии

* [React](https://github.com/facebook/react)
* [Redux](https://github.com/reduxjs/redux)
* [React Redux](https://github.com/reduxjs/react-redux)
* [Ant Design](https://github.com/ant-design/ant-design)
* [Moment Timezone](https://github.com/moment/moment-timezone)
* [Mapbox](https://github.com/mapbox/mapbox-gl-js)
* [Google Maps](https://cloud.google.com/maps-platform/)
* [Webpack](https://github.com/webpack/webpack)
* [Reselect](https://github.com/reduxjs/reselect)

## Демо

Демо доступно по данной ссылке.

## Команда

[![](https://i.imgur.com/K6tfENs.png)](https://github.com/akrayushkin)
[![](https://i.imgur.com/FVcIqTU.png)](https://github.com/ifoba)
[![](https://i.imgur.com/jCBeRvi.png)](https://github.com/MatusVit)
[![](https://i.imgur.com/gn3Y2Dc.png)](https://github.com/Yarkin13)
[![](https://i.imgur.com/fXTKYRc.png)](https://github.com/jenia-shibkova)
[![](https://i.imgur.com/OZU73g8.png)](https://github.com/ThatcheRRR)
