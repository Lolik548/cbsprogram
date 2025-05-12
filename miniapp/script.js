document.addEventListener('DOMContentLoaded', () => {
    // Находим контейнеры и кнопки после полной загрузки DOM
    const buttonsContainer = document.querySelector('.buttons-container'); // Контейнер с кнопками главного меню
    const mainButtons = document.querySelectorAll('.app-button'); // Все кнопки главного меню
    const pages = document.querySelectorAll('.app-page'); // Все блоки "страниц"
    const backButtons = document.querySelectorAll('.back-button'); // Все кнопки "Назад"

    // --- Инициализация ---

    // При загрузке страницы скрываем все страницы, чтобы было видно только главное меню
    pages.forEach(page => {
        page.classList.add('hidden');
    });
    // Убеждаемся, что контейнер с кнопками виден (на случай, если в HTML он изначально скрыт)
    buttonsContainer.classList.remove('hidden');


    // --- Функции навигации ---

    // Функция для показа определенной страницы и скрытия меню
    function showPage(pageId) {
        // Скрываем контейнер с кнопками главного меню
        buttonsContainer.classList.add('hidden');

        // Скрываем все блоки страниц на всякий случай
        pages.forEach(page => {
            page.classList.add('hidden');
        });

        // Находим и показываем нужную страницу по ее ID
        const targetPage = document.getElementById(`page-${pageId}`);
        if (targetPage) {
            targetPage.classList.remove('hidden');
            // Опционально: можно обновить заголовок или другие элементы интерфейса Telegram Mini Apps
            // if (window.Telegram && Telegram.WebApp) {
            //     Telegram.WebApp.setHeaderColor('secondary_bg_color'); // Пример изменения цвета заголовка
            //     Telegram.WebApp.SettingsButton.show(); // Пример показа кнопки настроек
            // }
        } else {
            console.error('Ошибка: Страница с ID', `page-${pageId}`, 'не найдена.');
            // Если страница не найдена, возвращаемся к главному меню
            showMainMenu();
        }
    }

    // Функция для показа главного меню и скрытия всех страниц
    function showMainMenu() {
        // Показываем контейнер с кнопками главного меню
        buttonsContainer.classList.remove('hidden');

        // Скрываем все блоки страниц
        pages.forEach(page => {
            page.classList.add('hidden');
        });
        // Опционально: можно вернуть настройки интерфейса Telegram Mini Apps по умолчанию
        // if (window.Telegram && Telegram.WebApp) {
        //     Telegram.WebApp.setHeaderColor('bg_color'); // Возвращаем цвет заголовка по умолчанию
        //     Telegram.WebApp.SettingsButton.hide(); // Пример скрытия кнопки настроек
        // }
    }

    // --- Обработчики событий ---

    // Добавляем обработчик клика для каждой кнопки главного меню
    mainButtons.forEach(button => {
        button.addEventListener('click', () => {
            const section = button.dataset.section; // Получаем значение атрибута data-section
            if (section) {
                // Если секция 'telegram', открываем внешнюю ссылку
                if (section === 'telegram') {
                     // !!! ВАЖНО: Замените 'ВАША_ССЫЛКА_НА_ТЕЛЕГРАМ' на реальную ссылку !!!
                     const telegramLink = 'https://t.me/your_telegram_channel_or_chat'; // Укажите вашу ссылку
                     if (window.Telegram && window.Telegram.WebApp) {
                         // Используем Telegram API для открытия ссылки
                         Telegram.WebApp.openLink(telegramLink);
                     } else {
                         // Фоллбэк для тестирования в обычном браузере
                         window.open(telegramLink, '_blank');
                     }
                     // После открытия ссылки остаемся на главном меню
                } else {
                    // Для остальных кнопок показываем соответствующую внутреннюю страницу
                     showPage(section);
                }
            }
        });
    });

    // Добавляем обработчик клика для каждой кнопки "Назад к меню" на страницах
    backButtons.forEach(backButton => {
        backButton.addEventListener('click', () => {
            showMainMenu(); // При клике на "Назад" показываем главное меню
        });
    });


    // --- Инициализация Telegram Mini Apps API ---

    // Проверяем, доступен ли API Telegram Web App (только если приложение запущено в Telegram)
     if (window.Telegram && window.Telegram.WebApp) {
        Telegram.WebApp.ready(); // Сообщаем Telegram клиенту, что приложение готово

        // Опционально: можно развернуть приложение на весь экран при старте
        // Telegram.WebApp.expand();

        // Опционально: можно подписаться на события изменения размеров окна или темы
        // Telegram.WebApp.onEvent('viewportChanged', function() {
        //     console.log('Viewport changed:', Telegram.WebApp.viewportStableHeight);
        // });
         // Telegram.WebApp.onEvent('themeChanged', function() {
        //     console.log('Theme changed:', Telegram.WebApp.themeParams);
        //     // Здесь можно обновить стили элементов в соответствии с новой темой
        //     document.body.style.backgroundColor = Telegram.WebApp.themeParams.bg_color || '#1e1e1e';
        //     document.body.style.color = Telegram.WebApp.themeParams.text_color || '#ffffff';
        //     // Обновите другие стили
        // });

         // Опционально: Применяем цвета темы Telegram при загрузке
         // document.body.style.backgroundColor = Telegram.WebApp.themeParams.bg_color || '#1e1e1e';
         // document.body.style.color = Telegram.WebApp.themeParams.text_color || '#ffffff';
         // Применение других цветов из themeParams к кнопкам и элементам (.app-button, .back-button, .app-page)
         // потребует более сложной логики или CSS переменных.
     } else {
         console.log("Telegram Web App API не доступен (возможно, запущено вне Telegram для отладки)");
     }

});