/*!
 * Паттерн простого плагина jQuery
 */


/*
 Обернули плагин в анонимную функцию, предотвращая конфликты между jQuery и другими библиотеками.
 (function($){…})(jQuery) создает анонимную функцию, и тут же вызывает ее,
 передавая в качестве параметра объект jQuery,
 таким образом внутри анонимной функции мы можем использовать алиас $ не боясь за конфликты с другими библиотеками
 — так как теперь $ находится лишь в области видимости нашей функции, и мы имеем полный контроль над ней
 */

// Предваряющие точка с запятой предотвращают ошибки соединений с предыдущими скриптами, которые, возможно, не были верно «закрыты».
!function ($, undefined) {

    // т.к. undefined, по определению ECMAScript 3, не является константой
    // здесь мы явно задаем неопределенную переменную
    // убеждаясь в ее действительной неопределенности
    // В стандарте ES5, undefined уже точно константа

    // Включить Strict Mode (Строгий Режим)
    // Строгий Режим - это новая возможность в стандарте ECMAScript 5,
    // которая позволяет вам перевести программу или функцию в «строгую» среду исполнения.
    // Строгая среда исполнения предотвращает от потенциальных ошибок, генерируя больше исключений.
    "use strict"; // jshint ;_;

    /* CLIPLOG PUBLIC CLASS DEFINITION
    * Определение публичного класса плагина
    * =============================== */

    // Конструктор плагина
    var Cliplog = function (element, options) {
        this.init(element, options)
    }

    var timer_id

    Cliplog.prototype = {

        constructor: Cliplog

        , init: function (element, options) {

            // Объявление локальных переменных для метода
            /*var var1
                , var2*/

            // jquery-объект, от которого вызван метод
            this.$element = $(element)
            // объединяем настройки плагина
            this.options = $.extend({}, $.fn.cliplog.defaults, options)

            var addKeywordsSelector = '.' + this.options.addKeywordsClass
            var closeKeywordsSelector = '.' + this.options.closeKeywordsClass
            var addKeywordToListSelector = '.' + this.options.addKeywordToListClass
            var addKeywordToSelectedSelector = '.' + this.options.addKeywordToSelectedClass
            var addSectionOptionsSelector = '.' + this.options.addSectionOptionsClass
            var closeSectionOptionsSelector = '.' + this.options.closeSectionOptionsClass
            var saveTemplateSelector = '.' + this.options.saveTemplateClass
            var applyTemplateSelector = '.' + this.options.applyTemplateClass
            var saveKeywordsSetSelector = '.' + this.options.saveKeywordsSetClass
            var removeSelectedKeywordSelector = '.' + this.options.removeSelectedKeywordClass
            $(closeKeywordsSelector).hide();
            $(closeSectionOptionsSelector).hide();

            // Связываем события
            // Если плагин вешает какой-либо обработчик, то лучше всего (читай всегда) данный обработчик повесить в своём собственном namespace.
            // Определяем пространство имён для событий, добавив точку и название пространства имён к названию типа события.
            // Это позволит в любой момент убрать все ваши обработчики, или вызвать только ваш
            //$('p').trigger("click.mySimplePlugin");
            //$('p').unbind(".mySimplePlugin");

            //this.$element.on('click.cliplog', this.options.selector, $.proxy(this.toggle, this))
            //this.$element.on('click.cliplog', this.click)

            //$(document).on('click.cliplog', addKeywordsSelector, this.addKeywords)
            $(document).on('click.cliplog', addKeywordsSelector, $.proxy(this.addKeywords, this))
            $(document).on('click.cliplog', closeKeywordsSelector, $.proxy(this.closeKeywords, this))
            $(document).on('click.cliplog', addKeywordToListSelector, $.proxy(this.addKeywordToList, this))
            $(document).on('click.cliplog', addKeywordToSelectedSelector, $.proxy(this.addKeywordToSelected, this))
            $(document).on('click.cliplog', '.cliplog_show_all_keywords', $.proxy(this.showAllKeywords, this))
            $(document).on('click.cliplog', addSectionOptionsSelector, $.proxy(this.addSectionOptions, this))
            $(document).on('click.cliplog', closeSectionOptionsSelector, $.proxy(this.closeSectionOptions, this))
            $(document).on('click.cliplog', saveTemplateSelector, $.proxy(this.saveTemplate, this))
            $(document).on('click.cliplog', saveKeywordsSetSelector, $.proxy(this.saveKeywordsSet, this))
            $(document).on('click.cliplog', removeSelectedKeywordSelector, $.proxy(this.onRemoveSelectedKeywordClick, this))
            $(document).on('click.cliplog', '.cliplog_selected_keywords_list input:checkbox', $.proxy(this.deselectSelectedKeyword, this))
            //$(document).on('click.cliplog', applyTemplateSelector, $.proxy(this.applyTemplate, this))


            $(document).on('keypress.cliplog', '.cliplog_keyword_input', $.proxy(this.filterKeywordsList, this))
        }

        , addKeywords: function (e) {
            e && e.preventDefault()

            var that = this
                , button = $(e.currentTarget)
                , section = button.closest('.cliplog_section')
                , sectionID
                , keywordsList

            if(section.length > 0){
                sectionID = section.attr('id')
                keywordsList = section.find('.cliplog_keywords_list')
                if(keywordsList.length > 0){
                    this.addSelectedKeywords(sectionID)
                }
                else{
                    this.showKeywordsList(sectionID)
                }
            }
        }

        , closeKeywords: function (e) {
            e && e.preventDefault()

            var that = this
                , button = $(e.currentTarget)
                , section = button.closest('.cliplog_section')
                , keywordsList

            if(section.length > 0){
                keywordsList = section.find('.cliplog_keywords_list')
                if(keywordsList.length > 0){
                    keywordsList.remove()
                    button.hide()
                }
            }
        }

        , showKeywordsList: function (sectionID, showAll, onMatch) {
            var that = this
                , keywords
                , keywordList = ''
                , selectedKeywordList = $('#' + sectionID).find('.cliplog_selected_keywords_list').first()
                , closeKeywordsBtn = $('#' + sectionID).find('.' + this.options.closeKeywordsClass).first()
                , selectedKeywordsIDs = []
            if(selectedKeywordList.length > 0){
                $.each(selectedKeywordList.find('input:checkbox:checked'), function(){
                    selectedKeywordsIDs.push($(this).val())
                })
            }

            $.ajax({
                type: 'POST',
                url: 'en/cliplog/keywords',
                dataType : 'json',
                data: ({section : sectionID, selected : selectedKeywordsIDs.join(','), showall : showAll, onmatch : onMatch}),
                cache: false,
                success: function(data){
                    keywords = data;
                    $('#' + sectionID).find('.cliplog_keywords_list').remove();
                    keywordList += '<div class="cliplog_keywords_list';
                    if(showAll)
                        keywordList += ' show_all_list';
                    keywordList += '"><input type="text" class="cliplog_keyword_input" value="';
                    if(onMatch)
                        keywordList += onMatch;
                    keywordList += '">';
                    keywordList += '<div class="button-cont"><button class="button_add cliplog_add_keyword_to_selected">Add keyword</button></div>';
                    keywordList += '<div class="button-cont"><button class="button_add cliplog_add_keyword_to_list">Add to list</button></div><br><br>';
                    if(keywords.length > 0){
                        var oneColumnLength = Math.ceil(keywords.length / 2)

                        keywordList += '<div class="column1"><table>';
                        $.each(keywords, function(index, value) {
                            keywordList += '<tr><td><label class="checkbox">' +
                                '<input type="checkbox" name="keyword-' + value.id + '" value="' + value.keyword + '" class="cliplog_keyword_checkbox"> ' + value.keyword +
                                '</label></td><td><div class="switch-cont">' +
                                '<div class="switch" data-animated="false" data-on-label="+" data-off-label="-">' +
                                '<input type="checkbox" ' + (!value.visible ? 'checked' : '') + ' value="' + value.id + '" /></div></div></td></tr>';

                            if(index + 1 == oneColumnLength)
                                keywordList += '</table></div><div class="column2"><table>';
                        });
                        keywordList += '</table><a href="#" class="cliplog_show_all_keywords">Show All</a></div>';
                    }
                    keywordList += '</div>';
                    keywordList = $(keywordList).appendTo($('#' + sectionID).find('.right').first());
                    keywordList.find('.switch')['bootstrapSwitch']();
                    keywordList.find('.switch').on('switch-change', function (e, data) {
                        var $el = $(data.el)
                            , value = data.value
                            , keywordID = $el.val()
                        if(value == false && keywordID)
                            that.switchOffKeyword(keywordID, sectionID)
                        else if(value == true && keywordID)
                            that.switchOnKeyword(keywordID, sectionID)
                    });
                    closeKeywordsBtn.show();
                }
            });
        }

        , addSelectedKeywords: function (sectionID) {
            var selectedKeywordList = $('#' + sectionID).find('.cliplog_selected_keywords_list').first()
                , keywordList = $('#' + sectionID).find('.cliplog_keywords_list').first()
            if(selectedKeywordList.length == 0)
                selectedKeywordList = $('<div class="cliplog_selected_keywords_list"></div>').appendTo($('#' + sectionID).find('.left').first());

            if(keywordList.length > 0){
                var selectedKeywordListHtml = '';
                $.each(keywordList.find('input.cliplog_keyword_checkbox:checked'), function(){
                    var keywordIDArr = $(this).attr('name').split('-');
                    var keywordID = keywordIDArr[1];
                    selectedKeywordListHtml += '<label class="checkbox"><input type="checkbox" name="keywords[' + keywordID + ']" value="' + keywordID + '" checked="checked"> ' + $(this).val() + '</label>';
                    $(this).parent().parent().parent().remove();
                })
                $(selectedKeywordListHtml).appendTo(selectedKeywordList)
            }
        }

        , addKeywordToList: function (e) {
            e && e.preventDefault()

            var that = this
                , button = $(e.currentTarget)
                , section = button.closest('.cliplog_section')
                , sectionID
                , keywordInput

            if(section.length > 0){
                sectionID = section.attr('id')
                keywordInput = section.find('.cliplog_keyword_input')
                if(keywordInput.length > 0 && keywordInput.val())
                    this.saveKeyword(keywordInput.val(), sectionID)
            }
        }

        , addKeywordToSelected: function (e) {
            e && e.preventDefault()

            var that = this
                , button = $(e.currentTarget)
                , section = button.closest('.cliplog_section')
                , sectionID
                , keywordInput

            if(section.length > 0){
                sectionID = section.attr('id')
                keywordInput = section.find('.cliplog_keyword_input')
                if(keywordInput.length > 0 && keywordInput.val()){
                    this.saveKeyword(keywordInput.val(), sectionID, true)
                }
            }
        }

        , saveKeyword: function (keyword, sectionID, addToSelected) {
            var that = this
                , keywordInput
            if(keyword && sectionID)
                $.ajax({
                    type: 'POST',
                    url: 'en/cliplog/savekeyword',
                    dataType : 'json',
                    data: ({keyword : keyword, section : sectionID}),
                    cache: false,
                    success: function(data){
                        if(data.status == 1 && data.keyword_id){
                            keywordInput = $('#' + sectionID).find('.cliplog_keyword_input')
                            if(keywordInput.length > 0)
                                keywordInput.val('')

                            if(addToSelected)
                                that.addKeywordToSelectedByID(data.keyword_id, keyword, sectionID)
                            else
                                that.showKeywordsList(sectionID)
                        }
                    }
                });
        }

        , addKeywordToSelectedByID: function (keywordID, keyword, sectionID) {
            var selectedKeywordList = $('#' + sectionID).find('.cliplog_selected_keywords_list').first()
            if(selectedKeywordList.length == 0)
                selectedKeywordList = $('<div class="cliplog_selected_keywords_list"></div>').appendTo($('#' + sectionID).find('.left').first());

            if(keywordID && keyword){
                var selectedKeywordListHtml = '';
                selectedKeywordListHtml += '<label class="checkbox"><input type="checkbox" name="keywords[' + keywordID + ']" value="' + keywordID + '" checked="checked"> ' + keyword + '</label>';
                $(selectedKeywordListHtml).appendTo(selectedKeywordList)
            }
        }

        , switchOffKeyword: function (keywordID, sectionID) {
            var that = this
            $.ajax({
                type: 'POST',
                url: 'en/cliplog/switchoffkeyword',
                dataType : 'json',
                data: ({keyword : keywordID}),
                cache: false,
                success: function(data){
                    if(data.status == 1)
                        that.showKeywordsList(sectionID)
                }
            });
        }

        , switchOnKeyword: function (keywordID, sectionID) {
            var that = this
            $.ajax({
                type: 'POST',
                url: 'en/cliplog/switchonkeyword',
                dataType : 'json',
                data: ({keyword : keywordID}),
                cache: false,
                success: function(data){
                    if(data.status == 1)
                        that.showKeywordsList(sectionID)
                }
            });
        }

        , showAllKeywords: function (e) {
            e && e.preventDefault()

            var that = this
                , button = $(e.currentTarget)
                , section = button.closest('.cliplog_section')
                , sectionID

            if(section.length > 0){
                sectionID = section.attr('id')
                this.showKeywordsList(sectionID, true)
            }
            return false;
        }

        , addSectionOptions: function (e) {
            e && e.preventDefault()

            var that = this
                , button = $(e.currentTarget)
                , section = button.closest('.cliplog_section')
                , sectionID
                , sectionOptionsList

            if(section.length > 0){
                sectionID = section.attr('id')
                sectionOptionsList = section.find('.cliplog_options_list')
                if(sectionOptionsList.length > 0){
                    this.addSelectedSectionOptions(sectionID)
                }
                else{
                    this.showSectionOptionsList(sectionID)
                }
            }
        }

        , addSelectedSectionOptions: function (sectionID){
            var selectedOptionsList = $('#' + sectionID).find('.cliplog_selected_options_list').first()
                , optionsList = $('#' + sectionID).find('.cliplog_options_list').first()
            if(selectedOptionsList.length == 0)
                selectedOptionsList = $('<div class="cliplog_selected_options_list"></div>').appendTo($('#' + sectionID).find('.left').first());

            if(optionsList.length > 0){
                var selectedOptionsListHtml = '';
                $.each(optionsList.find('input:checkbox:checked'), function(){
                    var optionIDArr = $(this).attr('name').split('-');
                    var optionID = optionIDArr[1];
                    selectedOptionsListHtml += '<label class="checkbox"><input type="checkbox" name="sections_values[' + sectionID + '][]" value="' + optionID + '" checked="checked"> ' + $(this).val() + '</label>';
                    $(this).parent().remove()
                })
                $(selectedOptionsListHtml).appendTo(selectedOptionsList)
            }
        }

        , showSectionOptionsList: function (sectionID) {

            var that = this
                , options
                , optionsList = ''
                , selectedOptionsList = $('#' + sectionID).find('.cliplog_selected_options_list').first()
                , closeOptionsBtn = $('#' + sectionID).find('.' + this.options.closeSectionOptionsClass).first()
                , selectedOptionsIDs = []

            if(selectedOptionsList.length > 0){
                $.each(selectedOptionsList.find('input:checkbox:checked'), function(){
                    selectedOptionsIDs.push($(this).val())
                })
            }

            $.ajax({
                type: 'POST',
                url: 'en/cliplog/sectionoptions',
                dataType : 'json',
                data: ({section : sectionID, selected :selectedOptionsIDs.join(',')}),
                cache: false,
                success: function(data){
                    options = data;
                    $('#' + sectionID).find('.cliplog_options_list').remove();
                    optionsList += '<div class="cliplog_options_list">';
                    if(options.length > 0){
                        $.each(options, function(index, value) {
                            optionsList += '<label class="checkbox">' +
                                '<input type="checkbox" name="option-' + value.id + '" value="' + value.value + '"> '
                                + value.value + '</label>';
                        });
                    }
                    optionsList += '</div>';
                    optionsList = $(optionsList).appendTo($('#' + sectionID).find('.right').first());
                    closeOptionsBtn.show();
                }
            });

        }

        , closeSectionOptions: function (e) {
            e && e.preventDefault()

            var that = this
                , button = $(e.currentTarget)
                , section = button.closest('.cliplog_section')
                , optionsList

            if(section.length > 0){
                optionsList = section.find('.cliplog_options_list')
                if(optionsList.length > 0){
                    optionsList.remove()
                    button.hide()
                }
            }
        }

        , saveTemplate: function (e) {
            e && e.preventDefault()

            var that = this
                , templateNameField = $('.cliplog_template_name').first()
                , templateName = templateNameField.val()
                , templateHeader = $('.cliplog_template_header').first()
            if(templateName){
                $.ajax({
                    type: 'POST',
                    url: 'en/cliplog/savetemplate',
                    dataType : 'json',
                    data: $("#cliplog_form").serialize(),
                    cache: false,
                    success: function(data){
                        if(data.status == 1 && data.template.id){
                            templateNameField.val('');
                            templateHeader.html(data.template.name)
                            that.getTemplatesList(data.template.id)
                            alert('Saved')
                        }
                    }
                });
            }
            else
                alert('Enter template name')
            return false;
        }

        , getTemplatesList: function (seleted) {
            var templatesListHtml = '<option value=""></option>'
                , templatesList = $('.cliplog_templates_list')

            if(templatesList.length > 0)
                $.ajax({
                    type: 'POST',
                    url: 'en/cliplog/gettemplates',
                    dataType : 'json',
                    cache: false,
                    success: function(data){
                        if(data.status == 1 && data.templates){
                            $.each(data.templates, function(index, value){
                                templatesListHtml += '<option value="' + value.id + '" '
                                if(seleted && seleted == value.id)
                                    templatesListHtml += 'selected '
                                templatesListHtml += '>' + value.name + '</option>'
                            })
                            templatesList.html(templatesListHtml)
                        }
                    }
                });
        }

        , applyTemplate: function (e) {
            e && e.preventDefault()

            var that = this
                , templateNameField = $('.cliplog_template_name').first()
                , templateName = templateNameField.val()
                , templateHeader = $('.cliplog_template_header').first()
            if(templateName){
                $.ajax({
                    type: 'POST',
                    url: 'en/cliplog/savetemplate',
                    dataType : 'json',
                    data: $("#cliplog_form").serialize(),
                    cache: false,
                    success: function(data){
                        if(data.status == 1 && data.template.id){
                            templateNameField.val('');
                            templateHeader.html(data.template.name)
                            that.getTemplatesList(data.template.id)
                            alert('Saved')
                        }
                    }
                });
            }
            else
                alert('Enter template name')
            return false;
        }

        , saveKeywordsSet: function (e) {
            e && e.preventDefault()

            var that = this
                , keywordsSetNameField = $('.cliplog_keywords_set_name').first()
                , keywordsSetName = keywordsSetNameField.val()
            if(keywordsSetName){
                $.ajax({
                    type: 'POST',
                    url: 'en/cliplog/savekeywordsset',
                    dataType : 'json',
                    data: $("#cliplog_form").serialize(),
                    cache: false,
                    success: function(data){
                        if(data.status == 1 && data.keywords_set.id){
                            keywordsSetNameField.val('');
                            that.getkeywordsSetList(data.keywords_set.id)
                            alert('Saved')
                        }
                    }
                });
            }
            else
                alert('Enter keywords set name')
            return false;
        }

        , getkeywordsSetList: function (seleted) {
            var keywordsSetsListHtml = '<option value=""></option>'
                , keywordsSetsList = $('.cliplog_keywords_sets_list')

            if(keywordsSetsList.length > 0)
                $.ajax({
                    type: 'POST',
                    url: 'en/cliplog/getkeywordssets',
                    dataType : 'json',
                    cache: false,
                    success: function(data){
                        if(data.status == 1 && data.keywords_sets){
                            $.each(data.keywords_sets, function(index, value){
                                keywordsSetsListHtml += '<option value="' + value.id + '" '
                                if(seleted && seleted == value.id)
                                    keywordsSetsListHtml += 'selected '
                                keywordsSetsListHtml += '>' + value.name + '</option>'
                            })
                            keywordsSetsList.html(keywordsSetsListHtml)
                        }
                    }
                });
        }

        , onRemoveSelectedKeywordClick: function (e) {
            e && e.preventDefault()

            var that = this
                , link = $(e.currentTarget)
                , idArr = link.attr('id').split('-')
                , keywordID = idArr[1]

            if(keywordID){
                link.parent().remove()
                this.removeSelectedKeyword(keywordID)
            }
        }

        , deselectSelectedKeyword: function (e) {

            var checkbox = $(e.currentTarget)
                , keywordID = checkbox.val()

            if (!checkbox.is(':checked') && keywordID) {
                this.removeSelectedKeyword(checkbox.val())
                $('#remove_keyword-' + keywordID).parent().remove();
            }
        }

        , removeSelectedKeyword: function (keywordID) {
            var selectedKeywords = $('.cliplog_selected_keywords_list input[value="' + keywordID + '"]')
                , that = this
            if(selectedKeywords.length > 0){
                $.each(selectedKeywords, function(){
                    var section = $(this).closest('.cliplog_section')
                        , keywordsList = section.find('.cliplog_keywords_list').first()
                        , sectionID = section.attr('id')
                    $(this).parent().remove();
                    if(keywordsList.length > 0){
                        that.showKeywordsList(sectionID)
                    }
                })
            }
        }

        , filterKeywordsList: function (e) {
            clearTimeout(timer_id);
            var that = this
                , input = $(e.currentTarget)
                , section = input.closest('.cliplog_section')
                , keywordsList
                , sectionID
                , showAll

            if(section.length > 0){
                sectionID = section.attr('id')
                keywordsList = section.find('.cliplog_keywords_list')
                if(keywordsList.length > 0 && keywordsList.hasClass('show_all_list'))
                    showAll = true

                timer_id = setTimeout(function(){
                    that.showKeywordsList(sectionID, showAll, input.val())
                }, 500);
            }
        }
    }


    /* CLIPLOG PLUGIN DEFINITION
     * ========================= */

    $.fn.cliplog = function (option) {

        //An Array-like object corresponding to the arguments passed to a function
        var args = arguments;

        // Для того, чтобы поддерживать цепочки вызовов в плагине($('div').mySimplePlugin().css('color', 'red');), плагин должен возвращать this в своей главной функции
        return this.each(function () {
            var $this = $(this)
                , data = $this.data('cliplog')
                , options = typeof option == 'object' && option

            // Проверяем, был-ли плагин уже проинициализирован для указанного элемента.
            // data из jQuery — это хороший способ отслеживать состояние переменных для каждого элемента.
            // Однако вместо того, чтобы отслеживать множество отдельных вызовов data с разными именами,
            // рекомендуется использовать один объектный литерал, который будет объединять все ваши переменные под одной крышей
            // и вы будете обращаться к этому объекту через одно пространство имён.
            if (!data) $this.data('cliplog', (data = new Cliplog(this, options)))

            // Если первый параметр при инициализайии плагина строковый:
            // либо просто вызываем метод
            //if (typeof option === 'string') data[option]()
            // либо вызываем метод с параметрами инициализации плагина, начиная со второго (первый параметр - название метода)
            if (typeof option === 'string')
                data[option].apply(data, Array.prototype.slice.call(args, 1));
        })
    }

    $.fn.cliplog.Constructor = Cliplog;

    $.fn.cliplog.defaults = {
        addKeywordsClass: 'cliplog_add_keywords'
        , closeKeywordsClass: 'cliplog_close_keywords'
        , addKeywordToListClass: 'cliplog_add_keyword_to_list'
        , addKeywordToSelectedClass: 'cliplog_add_keyword_to_selected'
        , addSectionOptionsClass: 'cliplog_add_section_options'
        , closeSectionOptionsClass: 'cliplog_close_options'
        , saveTemplateClass: 'cliplog_save_template'
        , applyTemplateClass: 'cliplog_apply_template'
        , saveKeywordsSetClass: 'cliplog_save_keywords_set'
        , removeSelectedKeywordClass: 'cliplog_remove_keyword'
    }

}(window.jQuery);

$(function() {
    $('#cliplog').cliplog();
});