/**************************************************************************
 **  jQuery Walidate v.2.4.5 (STABLE)
 **  Release date: 24. August 2015
 **  Copyright (c) 2013 Michael Fischer
 **  licensed under GPL v.3.0 & MIT
 **
 **  mail: dotwin[at]gmx[dot]net
 **
 **  + function-chaning
 **  + a lot of callback-functionalities
 **  + validating with regular expressions
 **  + works with HTML5-Input-Elements
 **  + and much more!
 *
 *   Regular Expressions Snippets can be found here: http://regexlib.com
 *
 *   Bugfix from 2.4.4 to 2.4.5
 *    - Issue nr. #1 closed. Check for regexp even if it's not a required input-field.
 * 
 *   Bugfix from 2.4.3.1 to 2.4.4:
 *    - added missing type="tel" support, thx to Patrick Doll
 *    - Bugfix for jQuery 1.8+, now compatible! thx for the error note to Patrick Doll
 *
 **************************************************************************/

/*jslint plusplus: true, vars: true */
/*jshint unused:false */

(function ($) {

    'use strict';

    var methods = {
        init: function (options, callback) {

            /**
             * Default-Eigenschaften
             **************************/
            var settings = $.extend({
                submitSelector: 'input[type="submit"]',

                /**
                 * validateClass und requiredClass wird automatisch sämtlichen Elementen hinzugefügt
                 * die validiert werden sollen.
                 * Soll ein Element nicht Pflicht sein, kann dies dem entsprechenden Element
                 * per required: false mitgegeben werden.
                 **************************************************************************************/
                validateClass: 'validate',
                requiredClass: 'required',

                /**
                 * CSS-Klassen die dynamisch hinzugefügt oder entfernt werden,
                 * je nachdem ob der Wert gültig oder ungültig ist.
                 ****************************************************************/
                validClass: 'valid',
                errorClass: 'error',

                /**
                 * Funktion die ausgeführt werden soll, wenn alle Eingaben korrekt sind und alle
                 * erforderlichen Eingaben ausgefüllt sind.
                 **********************************************************************************/
                doIfAllIsValid: undefined,

                /**
                 * Funktion die ausgeführt werden soll, wenn irgendeine Eingabe ungültig ist.
                 *******************************************************************************/
                doIfSomethingIsInvalid: undefined

            }, options);

            /**
             * Default-Eigenschaften in $.props speichern
             * damit Zugriff in anderen Mthoden möglich wird.
             ***************************************************/
            $.props = {
                validateClass: settings.validateClass,
                requiredClass: settings.requiredClass,
                validClass: settings.validClass,
                errorClass: settings.errorClass
            };

            $(settings.submitSelector).click(function () {

                /**
                 * Jeden definierten Event-Handler eines Elements finden
                 **********************************************************/
                function listeners(element) {
                    var theEvents = [],
                        nr = 0;
                    //$.each($(element).data("events"), function (i, event) { // jQuery 1.7.1
                    $.each($._data($(element)[0], "events"), function (i, event) { // jQuery 1.8+
                        theEvents[nr] = i;
                        nr += 1;
                    });

                    return theEvents; // returns Array
                }

                /**
                 * Alle erforderlichen Eingaben prüfen
                 * Falls nicht korrekt errorClass hinzufügen und
                 * für's Element definierte valid- und invalid-callbacks auslösen
                 ********************************************************************/
                $('.' + settings.requiredClass).not('.' + settings.validClass).addClass(settings.errorClass).each(function () {

                    /**
                     * Event triggern. Nur das erste, da ansonsten die
                     * valid und invalid-functions nicht ausgeführt werden.
                     *
                     * Falls ein Standardwert für das Element definiert wurde,
                     * ist der erste Eventhandler 'focus' und generiert einen Fehler.
                     * Deshalb zweiten registrierten Event-Handler triggern.
                     *******************************************************************/
                    if (listeners(this)[0] === 'focus') {
                        $(this).trigger(listeners(this)[1]);

                    /**
                     * Ersten Eventhandler triggern falls kein Standardwert definiert wurde.
                     **************************************************************************/
                    } else {
                        $(this).trigger(listeners(this)[0]);
                    }
                });

                /**
                 * Alle Texteingaben prüfen (nötig für Textfelder mit Platzhalterwerten)
                 * die nicht Pflicht sind.
                 **************************************************************************/
                $('.' + settings.validateClass)
                    .not('.' + settings.requiredClass)
                    .not('[type="checkbox"], [type="radio"], [type="select"]')
                    .each(function () {

                        if ($(this).val() === $(this).data('standard')) {
                            $(this).val('');
                        }

                        $(this).trigger(listeners(this)[0]);
                    });

                /**
                 * Prüfen ob alle requiredClass auch validClass haben
                 * und ob alle validateClass nicht errorClass haben
                 *******************************************************/
                if ($('.' + settings.requiredClass).length === $('.' + settings.requiredClass + '.' + settings.validClass).length && !$('.' + settings.validateClass + '.' + settings.errorClass).length) {

                    if (settings.doIfAllIsValid) {
                        settings.doIfAllIsValid.call(this);
                        return false;
                    }
                    return true;

                } else {

                    if (settings.doIfSomethingIsInvalid) {
                        settings.doIfSomethingIsInvalid.call(this);
                        return false;
                    }
                    return false;

                }

            });

            /**
             * Callback-Function
             **********************/
            if (typeof callback === 'function') {
                callback.call(this);
            }
        },
        validate: function (options, callback) {

            /**
             * Standard-Eigenschaften
             ***************************/
            var settings = $.extend({

                /**
                 * Standardwerte/-selektionen definieren:
                 * Textelemente     :   standard: "Platzhaltertext"
                 * Checkboxes       :   standard: "checked" oder true oder 1
                 * Radios           :   standard: ['eins']
                 * Select/Options   :   standard: ['eins', 'zwei']
                 ************************************************/
                standard: undefined,

                /**
                 * Validierung eines Feldes ermöglichen ohne das es eine Pflichteingabe ist
                 * Standard: das zu validierende Feld ist Pflicht => true
                 * Möglich: das zu validierende Feld ist NICHT Pflicht => false
                 *****************************************************************************/
                required: true,

                /**
                 * regular expression
                 ***********************/
                expression: undefined,

                /**
                 * event handler
                 * blur: beim verlassen des Elements
                 * change: bei Wertänderung
                 * keyup: beim loslassen einer Taste
                 * Der erste Event-Handler, in diesem Fall 'blur', wird für's triggern
                 * über alle erforderlichen Elemente verwendet.
                 ************************************************************************/
                eventHandler: 'blur change',

                /**
                 * Funktion die jedesmal ausgeführt wird, wenn Event (eventHandler)
                 * ausgelöst wird. Kann für eigene Validierungsfunktionen eingesetzt
                 * werden. (coming soon)
                 **********************************************************************/
                own: undefined,

                /**
                 * Callbacks falls Eingabe gültig/ungültig (function)
                 * invalid-function wird ebenfalls bei klick auf submit-button ausgeführt
                 * falls Wert inkorrekt
                 ***************************************************************************/
                valid: undefined,
                invalid: undefined,

                /**
                 * Erlaubte oder verbotene Werte/Selektionen
                 * Für Texteingaben, Select- und Radio-Elemente
                 * Muss als Array angegeben werden
                 * Beispiel: allowed: ['Ein Text', 'auch Gültig']
                 ************************************************************/
                allowed: undefined,
                prohibited: undefined,

                /**
                 * Text-Elemente vergleichen ermöglichen
                 * für alle Texteingaben
                 ******************************************/
                verify: $.extend({
                    // Selektor des Bestätigen-Feldes
                    selector: undefined,
                    // Callback-Funktions falls Eingabe gültig
                    valid: undefined,
                    // Callback-Funktion falls Eingabe ungültig
                    invalid: undefined
                })

            }, options),

                /**
                 * Tastatureingaben die nicht eine Überprüfung der Eingaben auslösen soll
                 * Auf "down arrow" und "up arrow" wurde verzichtet wegen input[type="number"]
                 * http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
                 ******************************************************************************/
                keykodes = {
                    9   : 'tab',
                    16  : 'shift',
                    17  : 'ctrl',
                    18  : 'alt',
                    20  : 'caps lock',
                    33  : 'page up',
                    34  : 'page down',
                    35  : 'end',
                    36  : 'home',
                    37  : 'left arrow',
                    39  : 'right arrow',
                    45  : 'insert',
                    112 : 'F1',
                    113 : 'F2',
                    114 : 'F3',
                    115 : 'F4',
                    116 : 'F5',
                    117 : 'F6',
                    118 : 'F7',
                    119 : 'F8',
                    120 : 'F9',
                    121 : 'F10',
                    122 : 'F11',
                    123 : 'F12',
                    144 : 'num lock'
                };

            /**
             * Regular Expression Check
             *****************************/
            function checkExp(value) {
                var filter = settings.expression;
                // Auf Regex prüfen
                if (filter.test(value)) {
                    return true;
                }
                return false;
            }

            /**
             * settings.valid und settings.invalid-callback-functions
             * inkl. der verify-callbacks
             ***********************************************************/
            function specialCallback(yeeha, verify) {
                var yeah = $(yeeha),
                    runCallback = (verify) ? settings.verify : settings;

                if (typeof runCallback.valid === 'function' && yeah.hasClass($.props.validClass)) {
                    runCallback.valid.call(yeeha);
                }
                if (typeof runCallback.invalid === 'function' && yeah.hasClass($.props.errorClass)) {
                    runCallback.invalid.call(yeeha);
                }
            }

            var textElementSelector = '[type="text"], [type="password"], [type="file"], [type="tel"], [type="datetime"], [type="datetime-local"], [type="date"], [type="month"], [type="week"], [type="time"], [type="number"], [type="range"], [type="email"], [type="color"], [type="url"], [type="search"], textarea';

            return this.each(function () {

                var $this = $(this);

                /**
                 * settings.standard Eigenschaft in Element abspeichern
                 * um bei Submit des Formulars prüfen zu können ob
                 * Standardwert  == derzeitiger Wert.
                 * Treffen diese Bedingungen zu, wird der Standardwert, vor dem Prüfen des Formulars
                 * im entsprechenden Textfeld entfernt.
                 **************************************************************************************/
                $this.data('standard', settings.standard);

                /**
                 * Allen Elementen die über das Plugin angesprochen werden
                 * die validateClass hinzufügen
                 ************************************************************/
                $this.addClass($.props.validateClass);

                /**
                 * Falls das Element eine Pflichteingabe ist
                 * auch requiredClass hinzufügen
                 **********************************************/
                if (settings.required) {
                    $this.addClass($.props.requiredClass);
                }

                /**
                 * Textelemente in lokaler Variable abspeichern
                 *************************************************/
                var textElements = $this.filter(textElementSelector);

                /**
                 * Platzhaltertext einfügen falls definiert
                 * Für input[type="text"], input[type="password"], input[type="file"]
                 * incl. HTML5 Elemente
                 *********************************************/
                if (settings.standard && textElements) {
                    textElements.val(settings.standard);

                    /**
                     * Bei :focus prüfen ob Standardwert in Feld, falls ja, löschen
                     *****************************************************************/
                    textElements.focus(function () {
                        if ($(this).val() === settings.standard) {
                            $(this).val('');
                        }
                    });

                    /**
                     * Beim Verlassen des Elements prüfen ob kein Wert drin, falls ja, Standardwert eifügen
                     *****************************************************************************************/
                    textElements.blur(function () {
                        if (!$(this).val() && settings.required) {
                            $(this).val(settings.standard);
                        }
                    });
                }

                /**
                 * input[type="text"], input[type="password"], input[type="file"]
                 * incl. HTML5 Elemente
                 *******************************************************************/
                textElements.bind(settings.eventHandler, function (event) {

                    /**
                     * Prüfen des Inhalts verhindern wenn bestimmte Taste gedrückt wurde.
                     * http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
                     ******************************************************************************/
                    if (keykodes.hasOwnProperty(event.keyCode)) {
                        return false;
                    }

                    var that = $(this),
                        value = that.val(),
                        verifySelector = $(settings.verify.selector);

                    /**
                     * Wenn RegEx definiert
                     *************************/
                    if (settings.expression) {
                        if (checkExp(value) && value) {

                            /**
                             * Wenn ein Array mit Werten definiert wurde, die das Feld nicht erlaubt
                             **************************************************************************/
                            if (settings.prohibited) {
                                if ($.inArray(value, settings.prohibited) === -1) {
                                    that.removeClass($.props.errorClass).addClass($.props.validClass);
                                } else {
                                    that.removeClass($.props.validClass).addClass($.props.errorClass);
                                }

                            /**
                             * Wenn ein Array mit Werten definiert wurde, die das Feld erlaubt
                             ********************************************************************/
                            } else if (settings.allowed) {
                                if ($.inArray(value, settings.allowed) !== -1) {
                                    that.removeClass($.props.errorClass).addClass($.props.validClass);
                                } else {
                                    that.removeClass($.props.validClass).addClass($.props.errorClass);
                                }
                            } else {
                                that.removeClass($.props.errorClass).addClass($.props.validClass);
                            }

                        /**
                         * Wenn Eingabe Pflicht
                         *************************/
                        } else if (settings.required) {
                            that.removeClass($.props.validClass).addClass($.props.errorClass);
                        } else {
                            if (checkExp(value)) {
                                that.removeClass($.props.errorClass).addClass($.props.validClass);
                            } else if (!checkExp(value)) {
                                that.removeClass($.props.validClass).addClass($.props.errorClass);
                            } else {
                                that.removeClass($.props.errorClass).removeClass($.props.validClass);
                            }


                            
                        }
                    /**
                     * Wenn RegEx nicht definiert
                     *******************************/
                    } else {
                        if (value) {

                            /**
                             * Wenn ein Array mit Werten definiert wurde, die das Feld nicht erlaubt
                             **************************************************************************/
                            if (settings.prohibited) {
                                if ($.inArray(value, settings.prohibited) === -1) {
                                    that.removeClass($.props.errorClass).addClass($.props.validClass);
                                } else {
                                    that.removeClass($.props.validClass).addClass($.props.errorClass);
                                }

                            /**
                             * Wenn ein Array mit Werten definiert wurde, die das Feld erlaubt
                             ********************************************************************/
                            } else if (settings.allowed) {
                                if ($.inArray(value, settings.allowed) !== -1) {
                                    that.removeClass($.props.errorClass).addClass($.props.validClass);
                                } else {
                                    that.removeClass($.props.validClass).addClass($.props.errorClass);
                                }
                            } else {
                                that.removeClass($.props.errorClass).addClass($.props.validClass);
                            }

                        /**
                         * Wenn Eingabe Pflicht
                         *************************/
                        } else if (settings.required) {
                            that.removeClass($.props.validClass).addClass($.props.errorClass);
                        } else {
                            that.removeClass($.props.errorClass).removeClass($.props.validClass);
                        }
                    }

                    /**
                     * Jeden definierten Event-Handler eines Elements finden
                     **********************************************************/
                    function listeners(element) {
                        var theEvents = [],
                            nr = 0;
                        //$.each($(element).data("events"), function (i, event) { // jQuery 1.7.1
                        $.each($._data($(element)[0], "events"), function (i, event) { // jQuery 1.8+
                            theEvents[nr] = i;
                            nr += 1;
                        });
                        return theEvents; // returns an Array
                    }

                    /**
                     * Erneut prüfen ob der Wert im Bestätigungsfeld stimmt
                     *********************************************************/
                    if (settings.verify.selector) {
                        if (verifySelector.val() !== value && verifySelector.hasClass($.props.validClass) && !value) {
                            verifySelector.removeClass($.props.validClass).addClass($.props.errorClass);
                        }
                        if (verifySelector.hasClass($.props.errorClass) || verifySelector.hasClass($.props.validClass)) {

                            /**
                             * Falls ein Standardwert für das Element definiert wurde,
                             * ist der erste Eventhandler 'focus' und generiert einen Fehler.
                             * Deshalb zweiten registrierten Event-Handler triggern.
                             *******************************************************************/
                            if (listeners(this)[0] === 'focus') {
                                verifySelector.trigger(listeners(this)[1]);

                            /**
                             * Ersten Eventhandler triggern falls kein Standardwert definiert wurde.
                             **************************************************************************/
                            } else {
                                verifySelector.trigger(listeners(this)[0]);
                            }
                        }
                    }

                    /**
                     *  Callback-Funktion ausführen falls valide oder nicht valide
                     ****************************************************************/
                    specialCallback(this);
                });

                /**
                 * Prüfen ob für die Text-Eingabe ein Bestätigungsfeld definiert wurde
                 ************************************************************************/
                if (settings.verify.selector) {

                    var that = $(this),
                        index = that.index();

                    /**
                     * Dem Feld eine Klasse hinzufügen um einen Vergleich
                     * mit dem Bestätigungsfeld zu ermöglichen, wenn dort Werte
                     * geändert werden.
                     * index des Elements in die Klasse einfügen, um das Element
                     * eindeutig zu identifizieren.
                     **************************************************************/
                    that.addClass('compare-' + index);
                    var compareSelector = $('.' + 'compare-' + index);

                    /**
                     * Dem Bestätigungsfeld requiredClass hinzufügen
                     * falls das Haupt-Element, mit dem verglichen werden soll,
                     * eine Pflichteingabe ist.
                     *************************************************************/
                    var verifySelector = that.closest('form').find(settings.verify.selector);

                    if (settings.required) {
                        verifySelector.addClass($.props.requiredClass);
                    }

                    verifySelector.addClass($.props.validateClass);

                    verifySelector.bind(settings.eventHandler, function (event) {

                        var those = $(this),
                            thoseVal = those.val();

                        /**
                         * Prüfen des Inhalts verhindern wenn bestimmte Taste gedrückt wurde.
                         * http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
                         ******************************************************************************/
                        if (keykodes.hasOwnProperty(event.keyCode)) {
                            return false;
                        }

                        // Ausführen wenn Feld nicht Pflicht
                        if (!compareSelector.val() && !compareSelector.hasClass($.props.validClass) && !compareSelector.hasClass($.props.errorClass)) {
                            those.removeClass($.props.validClass).removeClass($.props.errorClass).val('');
                        } else {
                            // Ausführen wenn Feld Pflicht
                            if (thoseVal === compareSelector.val() && thoseVal && that.hasClass($.props.validClass)) {
                                those.removeClass($.props.errorClass).addClass($.props.validClass);
                            } else {
                                those.removeClass($.props.validClass).addClass($.props.errorClass);
                            }
                        }

                        /**
                         *  Callback-Funktion ausführen falls valide oder nicht valide
                         ****************************************************************/
                        specialCallback(this, 1);

                    });
                }

                /**
                 * Checkbox-Elemente in lokaler Variable abspeichern
                 *************************************************/
                var checkboxElements = $this.filter('[type="checkbox"]');

                /**
                 * Checkbox häckchen setzen, falls definiert
                 * Für input[type="checkbox"]
                 *********************************************/
                if (settings.standard && checkboxElements) {
                    checkboxElements.attr('checked', 'checked');
                }

                /**
                 * input[type="checkbox"]
                 ***************************/
                checkboxElements.bind(settings.eventHandler, function (event) {

                    /**
                     * Prüfen des Inhalts verhindern wenn bestimmte Taste gedrückt wurde.
                     * http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
                     ******************************************************************************/
                    if (keykodes.hasOwnProperty(event.keyCode)) {
                        return false;
                    }

                    var that = $(this),
                        value = that.filter(':checked').val();

                    if (value) {
                        that.removeClass($.props.errorClass).addClass($.props.validClass);
                    } else if (settings.required) {
                        that.removeClass($.props.validClass).addClass($.props.errorClass);
                    } else {
                        that.removeClass($.props.errorClass).removeClass($.props.validClass);
                    }

                    /**
                     *  Callback-Funktion ausführen falls valide oder nicht valide
                     ****************************************************************/
                    specialCallback(this);
                });

                /**
                 * Radio-Elemente in lokaler Variable abspeichern
                 *************************************************/
                var radioGroup = $this.filter('[type="radio"]').attr('name'),
                    radioElements = $this.filter('[type="radio"]').filter('[name=' + radioGroup + ']');

                /**
                 * Checkbox häckchen setzen, falls definiert
                 * Für input[type="checkbox"]
                 *********************************************/
                if (settings.standard && radioElements) {
                    radioElements.filter('[value="' + settings.standard[0] +  '"]').attr('checked', 'checked');
                }

                /**
                 * input[type="radio"]
                 ************************/
                radioElements.bind(settings.eventHandler, function (event) {

                    /**
                     * Prüfen des Inhalts verhindern wenn bestimmte Taste gedrückt wurde.
                     * http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
                     ******************************************************************************/
                    if (keykodes.hasOwnProperty(event.keyCode)) {
                        return false;
                    }

                    var that = $(this),
                        value = that.filter(':checked').val(),
                        elements = that.closest('form').find('[type="radio"]').filter('[name=' + radioGroup + ']');

                    if (!settings.allowed || !settings.prohibited) {
                        if (value) {
                            elements.removeClass($.props.errorClass).addClass($.props.validClass);
                        } else if (settings.required) {
                            elements.removeClass($.props.validClass).addClass($.props.errorClass);
                        } else {
                            elements.removeClass($.props.validClass).removeClass($.props.errorClass);
                        }
                    }

                    // Falls erlaubte Eingaben als Array angegeben
                    if (typeof settings.allowed === 'object') {
                        if ($.inArray(value, settings.allowed) !== -1) {
                            elements.removeClass($.props.errorClass).addClass($.props.validClass);
                        } else if (settings.required) {
                            elements.removeClass($.props.validClass).addClass($.props.errorClass);
                        } else if ($.inArray(value, settings.allowed) === -1) {
                            elements.removeClass($.props.validClass).addClass($.props.errorClass);
                        } else {
                            elements.removeClass($.props.validClass).removeClass($.props.errorClass);
                        }
                    }

                    // Falls verbotene Eingaben als Array angegeben
                    if (typeof settings.prohibited === 'object') {
                        if ($.inArray(value, settings.prohibited) === -1) {
                            elements.removeClass($.props.errorClass).addClass($.props.validClass);
                        } else if (settings.required) {
                            elements.removeClass($.props.validClass).addClass($.props.errorClass);
                        } else if ($.inArray(value, settings.prohibited) !== -1) {
                            elements.removeClass($.props.validClass).addClass($.props.errorClass);
                        } else {
                            elements.removeClass($.props.validClass).removeClass($.props.errorClass);
                        }
                    }

                    /**
                     *  Callback-Funktion ausführen falls valide oder nicht valide
                     ****************************************************************/
                    specialCallback(this);
                });

                /**
                 * Select-Elemente in lokaler Variable abspeichern
                 *************************************************/
                var selectElements = $this.find('option').parent(),
                    optionElements = $this.find('option');

                /**
                 * Auswahl markieren, falls definiert
                 * Für option-Elemente
                 *********************************************/
                if (settings.standard && selectElements) {

                    var attrLength = settings.standard.length;
                    while (attrLength--) {
                        optionElements.filter('[value="' + settings.standard[attrLength] + '"]').attr('selected', 'selected');
                    }
                }

                /**
                 * select-Elemente
                 ********************/
                $this.find('option').parent().bind(settings.eventHandler, function (event) {

                    /**
                     * Prüfen des Inhalts verhindern wenn bestimmte Taste gedrückt wurde.
                     * http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
                     ******************************************************************************/
                    if (keykodes.hasOwnProperty(event.keyCode)) {
                        return false;
                    }

                    var that = $(this),
                        selected = that.find('option:selected'),
                        value = selected.val();

                    if (!settings.allowed || !settings.prohibited) {
                        if (value) {
                            that.removeClass($.props.errorClass).addClass($.props.validClass);
                        } else if (settings.reguired) {
                            that.removeClass($.props.validClass).addClass($.props.errorClass);
                        } else {
                            that.removeClass($.props.validClass).removeClass($.props.errorClass);
                        }
                    }

                    // Falls erlaubte Eingaben als Array angegeben
                    if (typeof settings.allowed === 'object') {
                        if ($.inArray(value, settings.allowed) !== -1) {
                            that.removeClass($.props.errorClass).addClass($.props.validClass);
                        } else if (settings.required) {
                            that.removeClass($.props.validClass).addClass($.props.errorClass);
                        } else if (value) {
                            that.removeClass($.props.validClass).addClass($.props.errorClass);
                        } else {
                            that.removeClass($.props.validClass).removeClass($.props.errorClass);
                        }
                    }

                    // Falls verbotene Eingaben als Array angegeben
                    if (typeof settings.prohibited === 'object') {
                        if ($.inArray(value, settings.prohibited) === -1) {
                            that.removeClass($.props.errorClass).addClass($.props.validClass);
                        } else if (settings.required) {
                            that.removeClass($.props.validClass).addClass($.props.errorClass);
                        } else if (value) {
                            that.removeClass($.props.validClass).addClass($.props.errorClass);
                        } else {
                            that.removeClass($.props.validClass).removeClass($.props.errorClass);
                        }
                    }

                    /**
                     *  Callback-Funktion ausführen falls valide oder nicht valide
                     ****************************************************************/
                    specialCallback(this);

                });

                /**
                 * callback-function
                 **********************/
                if (typeof callback === 'function') {
                    callback.call(this);
                }

            });
        },
        reset: function (callback) {

            return this.each(function () {

                var $this = $(this);

                /**
                 * Standardwert/Platzhaltertext in Text-Input-Elementen einfügen
                 * falls vorhanden, sonst Text entfernen.
                 ******************************************************************/
                $this.find(textElementSelector).each(function () {

                    /**
                     * Prüfen ob standardwert für dieses Element definiert.
                     * Falls ja, standardwert einfügen, sonst löschen.
                     *********************************************************/
                    if (!$(this).data('standard')) {
                        $(this).val('');
                    } else {
                        $(this).val($(this).data('standard'));
                    }

                });

                /**
                 * In Checkboxen häckchen setzen, falls für Element definiert,
                 * sonst entfernen.
                 ****************************************************************/
                $this.find('[type="checkbox"]').each(function () {

                    if (!$(this).data('standard')) {
                        $(this).removeAttr('checked');
                    } else {
                        $(this).attr('checked', 'checked');
                    }

                });

                /**
                 * Standardwert in radio-elementen setzen, falls definiert,
                 * sonst selektion entfernen.
                 *************************************************************/
                var radioGroup = $this.find('[type="radio"]').attr('name'),
                    radioElements = $this.find('[type="radio"]').filter('[name=' + radioGroup + ']');

                radioElements.each(function () {

                    if (!$(this).data('standard')) {
                        $(this).removeAttr('checked');
                    } else {
                        $(this).filter('[value="' + $(this).data('standard')[0] +  '"]').attr('checked', 'checked');
                    }

                });

                /**
                 * Standardwerte in select-Elementen setzen, falls definiert,
                 * falls nicht, erstes Element selektieren.
                 ***************************************************************/
                var selectElements = $(this).find('option').parent(),
                    optionElements = selectElements.find('option');

                optionElements.removeAttr('selected');

                selectElements.each(function () {
                    if ($(this).data('standard')) {
                        var attrLength = $(this).data('standard').length;
                        while (attrLength--) {
                            optionElements.filter('[value="' + $(this).data('standard')[attrLength] + '"]').attr('selected', 'selected');
                        }
                    } else if (!$(this).data('standard')) {
                        optionElements.filter(':eq(0)').attr('selected', 'selected');
                    }
                });

                /**
                 * errorClass und validClass entfernen.
                 *****************************************/
                $(this).find('.' + $.props.errorClass).removeClass($.props.errorClass);
                $(this).find('.' + $.props.validClass).removeClass($.props.validClass);

                /**
                 * callback-function
                 **********************/
                if (typeof callback === 'function') {
                    callback.call(this);
                }

            });

        }
    };
    $.fn.walidate = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.walidate');
        }
    };
}(jQuery)); // END plugin
