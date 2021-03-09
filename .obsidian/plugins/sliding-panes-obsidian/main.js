'use strict';

var obsidian = require('obsidian');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var SlidingPanesSettings = /** @class */ (function () {
    function SlidingPanesSettings() {
        this.headerWidth = 32;
        this.leafWidth = 700;
        this.leafAutoWidth = false;
        this.disabled = false;
        this.rotateHeaders = true;
        this.headerAlt = false;
        this.stackingEnabled = true;
    }
    return SlidingPanesSettings;
}());
var SlidingPanesSettingTab = /** @class */ (function (_super) {
    __extends(SlidingPanesSettingTab, _super);
    function SlidingPanesSettingTab(app, plugin) {
        var _this = _super.call(this, app, plugin) || this;
        _this.plugin = plugin;
        return _this;
    }
    SlidingPanesSettingTab.prototype.display = function () {
        var _this = this;
        var containerEl = this.containerEl;
        containerEl.empty();
        new obsidian.Setting(containerEl)
            .setName("Toggle Sliding Panes")
            .setDesc("Turns sliding panes on or off globally")
            .addToggle(function (toggle) { return toggle.setValue(!_this.plugin.settings.disabled)
            .onChange(function (value) {
            _this.plugin.settings.disabled = !value;
            _this.plugin.saveData(_this.plugin.settings);
            if (_this.plugin.settings.disabled) {
                _this.plugin.disable();
            }
            else {
                _this.plugin.enable();
            }
        }); });
        new obsidian.Setting(containerEl)
            .setName('Leaf Auto Width')
            .setDesc('If on, the width of the pane should fill the available space')
            .addToggle(function (toggle) { return toggle.setValue(_this.plugin.settings.leafAutoWidth)
            .onChange(function (value) {
            _this.plugin.settings.leafAutoWidth = value;
            _this.plugin.saveData(_this.plugin.settings);
            _this.plugin.refresh();
        }); });
        new obsidian.Setting(containerEl)
            .setName('Leaf Width')
            .setDesc('The width of a single pane (only if auto width is off)')
            .addText(function (text) { return text.setPlaceholder('Example: 700')
            .setValue((_this.plugin.settings.leafWidth || '') + '')
            .onChange(function (value) {
            _this.plugin.settings.leafWidth = parseInt(value.trim());
            _this.plugin.saveData(_this.plugin.settings);
            _this.plugin.refresh();
        }); });
        new obsidian.Setting(containerEl)
            .setName("Toggle rotated headers")
            .setDesc("Rotates headers to use as spines")
            .addToggle(function (toggle) { return toggle.setValue(_this.plugin.settings.rotateHeaders)
            .onChange(function (value) {
            _this.plugin.settings.rotateHeaders = value;
            _this.plugin.saveData(_this.plugin.settings);
            _this.plugin.refresh();
        }); });
        new obsidian.Setting(containerEl)
            .setName("Swap rotated header direction")
            .setDesc("Swaps the direction of rotated headers")
            .addToggle(function (toggle) { return toggle.setValue(_this.plugin.settings.headerAlt)
            .onChange(function (value) {
            _this.plugin.settings.headerAlt = value;
            _this.plugin.saveData(_this.plugin.settings);
            _this.plugin.refresh();
        }); });
        new obsidian.Setting(containerEl)
            .setName("Toggle stacking")
            .setDesc("Panes will stack up to the left and right")
            .addToggle(function (toggle) { return toggle.setValue(_this.plugin.settings.stackingEnabled)
            .onChange(function (value) {
            _this.plugin.settings.stackingEnabled = value;
            _this.plugin.saveData(_this.plugin.settings);
            _this.plugin.refresh();
        }); });
        new obsidian.Setting(containerEl)
            .setName('Spine Width')
            .setDesc('The width of the rotated header (or gap) for stacking')
            .addText(function (text) { return text.setPlaceholder('Example: 32')
            .setValue((_this.plugin.settings.headerWidth || '') + '')
            .onChange(function (value) {
            _this.plugin.settings.headerWidth = parseInt(value.trim());
            _this.plugin.saveData(_this.plugin.settings);
            _this.plugin.refresh();
        }); });
    };
    return SlidingPanesSettingTab;
}(obsidian.PluginSettingTab));
var SlidingPanesCommands = /** @class */ (function () {
    function SlidingPanesCommands(plugin) {
        this.plugin = plugin;
    }
    SlidingPanesCommands.prototype.addToggleSettingCommand = function (id, name, settingName) {
        var _this = this;
        this.plugin.addCommand({
            id: id,
            name: name,
            callback: function () {
                // switch the setting, save and refresh
                //@ts-ignore
                _this.plugin.settings[settingName] = !_this.plugin.settings[settingName];
                _this.plugin.saveData(_this.plugin.settings);
                _this.plugin.refresh();
            }
        });
    };
    SlidingPanesCommands.prototype.addCommands = function () {
        var _this = this;
        // add the toggle on/off command
        this.plugin.addCommand({
            id: 'toggle-sliding-panes',
            name: 'Toggle Sliding Panes',
            callback: function () {
                // switch the disabled setting and save
                _this.plugin.settings.disabled = !_this.plugin.settings.disabled;
                _this.plugin.saveData(_this.plugin.settings);
                // disable or enable as necessary
                _this.plugin.settings.disabled ? _this.plugin.disable() : _this.plugin.enable();
            }
        });
        // add a command to toggle leaf auto width
        this.addToggleSettingCommand('toggle-sliding-panes-leaf-auto-width', 'Toggle Leaf Auto Width', 'leafAutoWidth');
        // add a command to toggle stacking
        this.addToggleSettingCommand('toggle-sliding-panes-stacking', 'Toggle Stacking', 'stackingEnabled');
        // add a command to toggle rotated headers
        this.addToggleSettingCommand('toggle-sliding-panes-rotated-headers', 'Toggle Rotated Headers', 'rotateHeaders');
        // add a command to toggle swapped header direction
        this.addToggleSettingCommand('toggle-sliding-panes-header-alt', 'Swap rotated header direction', 'headerAlt');
    };
    return SlidingPanesCommands;
}());

var SlidingPanesPlugin = /** @class */ (function (_super) {
    __extends(SlidingPanesPlugin, _super);
    function SlidingPanesPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // helper variables
        _this.activeLeafIndex = 0;
        _this.prevRootLeaves = [];
        // enable andy mode
        _this.enable = function () {
            // add the event handlers
            _this.registerEvent(_this.app.workspace.on('resize', _this.handleResize));
            _this.registerEvent(_this.app.workspace.on('layout-change', _this.handleLayoutChange));
            _this.registerEvent(_this.app.workspace.on('file-open', _this.handleFileOpen));
            _this.registerEvent(_this.app.vault.on('delete', _this.handleDelete));
            // wait for layout to be ready to perform the rest
            _this.app.workspace.layoutReady ? _this.reallyEnable() : _this.app.workspace.on('layout-ready', _this.reallyEnable);
        };
        // really enable things (once the layout is ready)
        _this.reallyEnable = function () {
            // we don't need the event handler anymore
            _this.app.workspace.off('layout-ready', _this.reallyEnable);
            // backup the function so I can restore it
            _this.rootSplitAny.oldOnChildResizeStart = _this.rootSplitAny.onChildResizeStart;
            _this.rootSplitAny.onChildResizeStart = _this.onChildResizeStart;
            // add some extra classes that can't fit in the styles.css
            // because they use settings
            _this.addStyle();
            // do all the calucations necessary for the workspace leaves
            _this.recalculateLeaves();
        };
        // shut down andy mode
        _this.disable = function () {
            // get rid of the extra style tag we added
            _this.removeStyle();
            // iterate through the root leaves to remove the stuff we added
            _this.rootLeaves.forEach(_this.clearLeaf);
            // restore the default functionality
            _this.rootSplitAny.onChildResizeStart = _this.rootSplitAny.oldOnChildResizeStart;
        };
        _this.clearLeaf = function (leaf) {
            leaf.containerEl.style.width = null;
            leaf.containerEl.style.left = null;
            leaf.containerEl.style.right = null;
            leaf.containerEl.classList.remove('mod-am-left-of-active');
            leaf.containerEl.classList.remove('mod-am-right-of-active');
            var iconEl = leaf.view.iconEl;
            var iconText = iconEl.getAttribute("aria-label");
            if (iconText.includes("(")) {
                iconEl.setAttribute("aria-label", iconText.substring(iconText.lastIndexOf('(') + 1, iconText.lastIndexOf(')')));
            }
        };
        // refresh funcion for when we change settings
        _this.refresh = function () {
            // re-load the style
            _this.updateStyle();
            // recalculate leaf positions
            _this.recalculateLeaves();
        };
        // remove the stlying elements we've created
        _this.removeStyle = function () {
            var el = document.getElementById('plugin-sliding-panes');
            if (el)
                el.remove();
            document.body.classList.remove('plugin-sliding-panes');
            document.body.classList.remove('plugin-sliding-panes-rotate-header');
            document.body.classList.remove('plugin-sliding-panes-header-alt');
            document.body.classList.remove('plugin-sliding-panes-stacking');
        };
        // add the styling elements we need
        _this.addStyle = function () {
            // add a css block for our settings-dependent styles
            var css = document.createElement('style');
            css.id = 'plugin-sliding-panes';
            document.getElementsByTagName("head")[0].appendChild(css);
            // add the main class
            document.body.classList.add('plugin-sliding-panes');
            // update the style with the settings-dependent styles
            _this.updateStyle();
        };
        // update the styles (at the start, or as the result of a settings change)
        _this.updateStyle = function () {
            // if we've got rotate headers on, add the class which enables it
            document.body.classList.toggle('plugin-sliding-panes-rotate-header', _this.settings.rotateHeaders);
            document.body.classList.toggle('plugin-sliding-panes-header-alt', _this.settings.headerAlt);
            // do the same for stacking
            document.body.classList.toggle('plugin-sliding-panes-stacking', _this.settings.stackingEnabled);
            // get the custom css element
            var el = document.getElementById('plugin-sliding-panes');
            if (!el)
                throw "plugin-sliding-panes element not found!";
            else {
                // set the settings-dependent css
                el.innerText = "body.plugin-sliding-panes{--header-width:" + _this.settings.headerWidth + "px;}";
                if (!_this.settings.leafAutoWidth) {
                    el.innerText += "body.plugin-sliding-panes .mod-root>.workspace-leaf{width:" + (_this.settings.leafWidth + _this.settings.headerWidth) + "px;}";
                }
            }
        };
        _this.handleResize = function () {
            if (_this.app.workspace.layoutReady) {
                _this.recalculateLeaves();
            }
        };
        _this.handleLayoutChange = function () {
            var rootLeaves = _this.rootLeaves;
            if (rootLeaves.length < _this.prevRootLeaves.length) {
                _this.prevRootLeaves.forEach(function (leaf) {
                    if (!rootLeaves.contains(leaf)) {
                        _this.clearLeaf(leaf);
                    }
                });
            }
            _this.prevRootLeaves = _this.rootLeaves;
            //this.recalculateLeaves();
        };
        // Recalculate the leaf sizing and positions
        _this.recalculateLeaves = function () {
            // rootSplit.children is undocumented for now, but it's easier to use for what we're doing.
            // we only want leaves at the root of the root split
            // (this is to fix compatibility with backlinks in document and other such plugins)
            var rootContainerEl = _this.rootContainerEl;
            var rootLeaves = _this.rootLeaves;
            var leafCount = rootLeaves.length;
            var totalWidth = 0;
            // iterate through all the root-level leaves
            var widthChange = false;
            rootLeaves.forEach(function (leaf, i) {
                // @ts-ignore to get the undocumented containerEl
                var containerEl = leaf.containerEl;
                containerEl.style.flex = null;
                var oldWidth = containerEl.clientWidth;
                if (_this.settings.leafAutoWidth) {
                    containerEl.style.width = (rootContainerEl.clientWidth - ((leafCount - 1) * _this.settings.headerWidth)) + "px";
                }
                else {
                    containerEl.style.width = null;
                }
                if (oldWidth == containerEl.clientWidth)
                    widthChange = true;
                containerEl.style.left = _this.settings.stackingEnabled
                    ? (i * _this.settings.headerWidth) + "px"
                    : null;
                containerEl.style.right = _this.settings.stackingEnabled
                    ? (((leafCount - i) * _this.settings.headerWidth) - containerEl.clientWidth) + "px"
                    : null;
                // keep track of the total width of all leaves
                totalWidth += containerEl.clientWidth;
                var iconEl = leaf.view.iconEl;
                var iconText = iconEl.getAttribute("aria-label");
                if (!iconText.includes("(")) {
                    iconEl.setAttribute("aria-label", leaf.getDisplayText() + " (" + iconText + ")");
                }
            });
            // if the total width of all leaves is less than the width available,
            // add back the flex class so they fill the space
            if (totalWidth < rootContainerEl.clientWidth) {
                rootLeaves.forEach(function (leaf) {
                    leaf.containerEl.style.flex = '1 0 0';
                });
            }
            if (widthChange)
                _this.focusActiveLeaf(!_this.settings.leafAutoWidth);
        };
        // this function is called, not only when a file opens, but when the active pane is switched
        _this.handleFileOpen = function (e) {
            // put a small timeout on it because when a file is opened on the far right 
            // it wasn't focussing properly. The timeout fixes this
            setTimeout(function () {
                // focus on the newly selected leaf
                _this.focusActiveLeaf();
            }, 10);
        };
        // hande when a file is deleted
        _this.handleDelete = function (file) {
            // close any leaves with the deleted file open
            // detaching a leaf while iterating messes with the iteration
            var leavesToDetach = [];
            _this.app.workspace.iterateRootLeaves(function (leaf) {
                if (leaf.view instanceof obsidian.FileView && leaf.view.file == file) {
                    leavesToDetach.push(leaf);
                }
            });
            leavesToDetach.forEach(function (leaf) { return leaf.detach(); });
        };
        // overriden function for rootSplit child resize
        _this.onChildResizeStart = function (leaf, event) {
            // only really apply this to vertical splits
            if (_this.rootSplitAny.direction === "vertical") {
                // this is the width the leaf started at before resize
                var startWidth_1 = leaf.containerEl.clientWidth;
                // the mousemove event to trigger while resizing
                var mousemove_1 = function (e) {
                    // get the difference between the first position and current
                    var deltaX = e.pageX - event.pageX;
                    // adjust the start width by the delta
                    leaf.containerEl.style.width = startWidth_1 + deltaX + "px";
                };
                // the mouseup event to trigger at the end of resizing
                var mouseup_1 = function () {
                    // if stacking is enabled, we need to re-jig the "right" value
                    if (_this.settings.stackingEnabled) {
                        // we need the leaf count and index to calculate the correct value
                        var rootLeaves = _this.rootLeaves;
                        var leafCount = rootLeaves.length;
                        var leafIndex = rootLeaves.findIndex(function (l) { return l == leaf; });
                        leaf.containerEl.style.right = (((leafCount - leafIndex - 1) * _this.settings.headerWidth) - leaf.containerEl.clientWidth) + "px";
                    }
                    // remove these event listeners. We're done with them
                    document.removeEventListener("mousemove", mousemove_1);
                    document.removeEventListener("mouseup", mouseup_1);
                };
                // Add the above two event listeners
                document.addEventListener("mousemove", mousemove_1);
                document.addEventListener("mouseup", mouseup_1);
            }
        };
        return _this;
    }
    Object.defineProperty(SlidingPanesPlugin.prototype, "rootSplit", {
        // helper gets for any casts (for undocumented API stuff)
        get: function () { return this.app.workspace.rootSplit; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SlidingPanesPlugin.prototype, "rootSplitAny", {
        get: function () { return this.rootSplit; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SlidingPanesPlugin.prototype, "rootContainerEl", {
        get: function () { return this.app.workspace.rootSplit.containerEl; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SlidingPanesPlugin.prototype, "rootLeaves", {
        get: function () {
            var rootContainerEl = this.rootContainerEl;
            var rootLeaves = [];
            this.app.workspace.iterateRootLeaves(function (leaf) {
                if (leaf.containerEl.parentElement === rootContainerEl) {
                    rootLeaves.push(leaf);
                }
            });
            return rootLeaves;
        },
        enumerable: false,
        configurable: true
    });
    // when the plugin is loaded
    SlidingPanesPlugin.prototype.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        // load settings
                        _a = this;
                        _c = (_b = Object).assign;
                        _d = [new SlidingPanesSettings()];
                        return [4 /*yield*/, this.loadData()];
                    case 1:
                        // load settings
                        _a.settings = _c.apply(_b, _d.concat([_e.sent()]));
                        // if it's not disabled in the settings, enable it
                        if (!this.settings.disabled)
                            this.enable();
                        // add the settings tab
                        this.addSettingTab(new SlidingPanesSettingTab(this.app, this));
                        // add the commands
                        new SlidingPanesCommands(this).addCommands();
                        return [2 /*return*/];
                }
            });
        });
    };
    // on unload, perform the same steps as disable
    SlidingPanesPlugin.prototype.onunload = function () {
        this.disable();
    };
    SlidingPanesPlugin.prototype.focusActiveLeaf = function (animated) {
        var _this = this;
        if (animated === void 0) { animated = true; }
        // get back to the leaf which has been andy'd (`any` because parentSplit is undocumented)
        var activeLeaf = this.app.workspace.activeLeaf;
        while (activeLeaf != null && activeLeaf.parentSplit != null && activeLeaf.parentSplit != this.app.workspace.rootSplit) {
            activeLeaf = activeLeaf.parentSplit;
        }
        if (activeLeaf != null && this.rootSplit) {
            var rootContainerEl = this.rootContainerEl;
            var rootLeaves = this.rootLeaves;
            var leafCount = rootLeaves.length;
            // get the index of the active leaf
            // also, get the position of this leaf, so we can scroll to it
            // as leaves are resizable, we have to iterate through all leaves to the
            // left until we get to the active one and add all their widths together
            var position_1 = 0;
            this.activeLeafIndex = -1;
            rootLeaves.forEach(function (leaf, index) {
                // @ts-ignore to get the undocumented containerEl
                var containerEl = leaf.containerEl;
                // this is the active one
                if (leaf == activeLeaf) {
                    _this.activeLeafIndex = index;
                    containerEl.classList.remove('mod-am-left-of-active');
                    containerEl.classList.remove('mod-am-right-of-active');
                }
                else if (_this.activeLeafIndex == -1 || index < _this.activeLeafIndex) {
                    // this is before the active one, add the width
                    position_1 += containerEl.clientWidth;
                    containerEl.classList.add('mod-am-left-of-active');
                    containerEl.classList.remove('mod-am-right-of-active');
                }
                else {
                    // this is right of the active one
                    containerEl.classList.remove('mod-am-left-of-active');
                    containerEl.classList.add('mod-am-right-of-active');
                }
            });
            // get this leaf's left value (the amount of space to the left for sticky headers)
            var left = parseInt(activeLeaf.containerEl.style.left) || 0;
            // the amount of space to the right we need to leave for sticky headers
            var headersToRightWidth = this.settings.stackingEnabled ? (leafCount - this.activeLeafIndex - 1) * this.settings.headerWidth : 0;
            // it's too far left
            if (rootContainerEl.scrollLeft > position_1 - left) {
                // scroll the left side of the pane into view
                rootContainerEl.scrollTo({ left: position_1 - left, top: 0, behavior: animated ? 'smooth' : 'auto' });
            }
            // it's too far right
            else if (rootContainerEl.scrollLeft + rootContainerEl.clientWidth < position_1 + activeLeaf.containerEl.clientWidth + headersToRightWidth) {
                // scroll the right side of the pane into view
                rootContainerEl.scrollTo({ left: position_1 + activeLeaf.containerEl.clientWidth + headersToRightWidth - rootContainerEl.clientWidth, top: 0, behavior: animated ? 'smooth' : 'auto' });
            }
        }
    };
    return SlidingPanesPlugin;
}(obsidian.Plugin));

module.exports = SlidingPanesPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsInNyYy9zZXR0aW5ncy50cyIsInNyYy9tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XHJcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgb1trMl0gPSBtW2tdO1xyXG59KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgbykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKSkgX19jcmVhdGVCaW5kaW5nKG8sIG0sIHApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5KHRvLCBmcm9tKSB7XHJcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBmcm9tLmxlbmd0aCwgaiA9IHRvLmxlbmd0aDsgaSA8IGlsOyBpKyssIGorKylcclxuICAgICAgICB0b1tqXSA9IGZyb21baV07XHJcbiAgICByZXR1cm4gdG87XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcclxufSkgOiBmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcclxuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHByaXZhdGVNYXApIHtcclxuICAgIGlmICghcHJpdmF0ZU1hcC5oYXMocmVjZWl2ZXIpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImF0dGVtcHRlZCB0byBnZXQgcHJpdmF0ZSBmaWVsZCBvbiBub24taW5zdGFuY2VcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcHJpdmF0ZU1hcC5nZXQocmVjZWl2ZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgcHJpdmF0ZU1hcCwgdmFsdWUpIHtcclxuICAgIGlmICghcHJpdmF0ZU1hcC5oYXMocmVjZWl2ZXIpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImF0dGVtcHRlZCB0byBzZXQgcHJpdmF0ZSBmaWVsZCBvbiBub24taW5zdGFuY2VcIik7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlTWFwLnNldChyZWNlaXZlciwgdmFsdWUpO1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59XHJcbiIsImltcG9ydCB7IEFwcCwgUGx1Z2luLCBQbHVnaW5TZXR0aW5nVGFiLCBTZXR0aW5nIH0gZnJvbSAnb2JzaWRpYW4nO1xuXG5kZWNsYXJlIGNsYXNzIFNsaWRpbmdQYW5lc1BsdWdpbiBleHRlbmRzIFBsdWdpbiB7XG4gIHNldHRpbmdzOiBTbGlkaW5nUGFuZXNTZXR0aW5ncztcbiAgZGlzYWJsZSgpOiB2b2lkO1xuICBlbmFibGUoKTogdm9pZDtcbiAgcmVmcmVzaCgpOiB2b2lkO1xufVxuXG5leHBvcnQgY2xhc3MgU2xpZGluZ1BhbmVzU2V0dGluZ3Mge1xuICBoZWFkZXJXaWR0aDogbnVtYmVyID0gMzI7XG4gIGxlYWZXaWR0aDogbnVtYmVyID0gNzAwO1xuICBsZWFmQXV0b1dpZHRoOiBib29sZWFuID0gZmFsc2U7XG4gIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIHJvdGF0ZUhlYWRlcnM6IGJvb2xlYW4gPSB0cnVlO1xuICBoZWFkZXJBbHQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgc3RhY2tpbmdFbmFibGVkOiBib29sZWFuID0gdHJ1ZTtcbn1cblxuZXhwb3J0IGNsYXNzIFNsaWRpbmdQYW5lc1NldHRpbmdUYWIgZXh0ZW5kcyBQbHVnaW5TZXR0aW5nVGFiIHtcblxuICBwbHVnaW46IFNsaWRpbmdQYW5lc1BsdWdpbjtcbiAgY29uc3RydWN0b3IoYXBwOiBBcHAsIHBsdWdpbjogU2xpZGluZ1BhbmVzUGx1Z2luKSB7XG4gICAgc3VwZXIoYXBwLCBwbHVnaW4pO1xuICAgIHRoaXMucGx1Z2luID0gcGx1Z2luO1xuICB9XG5cbiAgZGlzcGxheSgpOiB2b2lkIHtcbiAgICBsZXQgeyBjb250YWluZXJFbCB9ID0gdGhpcztcblxuICAgIGNvbnRhaW5lckVsLmVtcHR5KCk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiVG9nZ2xlIFNsaWRpbmcgUGFuZXNcIilcbiAgICAgIC5zZXREZXNjKFwiVHVybnMgc2xpZGluZyBwYW5lcyBvbiBvciBvZmYgZ2xvYmFsbHlcIilcbiAgICAgIC5hZGRUb2dnbGUodG9nZ2xlID0+IHRvZ2dsZS5zZXRWYWx1ZSghdGhpcy5wbHVnaW4uc2V0dGluZ3MuZGlzYWJsZWQpXG4gICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5kaXNhYmxlZCA9ICF2YWx1ZTtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XG4gICAgICAgICAgaWYgKHRoaXMucGx1Z2luLnNldHRpbmdzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5kaXNhYmxlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uZW5hYmxlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKCdMZWFmIEF1dG8gV2lkdGgnKVxuICAgICAgLnNldERlc2MoJ0lmIG9uLCB0aGUgd2lkdGggb2YgdGhlIHBhbmUgc2hvdWxkIGZpbGwgdGhlIGF2YWlsYWJsZSBzcGFjZScpXG4gICAgICAuYWRkVG9nZ2xlKHRvZ2dsZSA9PiB0b2dnbGUuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MubGVhZkF1dG9XaWR0aClcbiAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmxlYWZBdXRvV2lkdGggPSB2YWx1ZTtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XG4gICAgICAgICAgdGhpcy5wbHVnaW4ucmVmcmVzaCgpO1xuICAgICAgICB9KSk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKCdMZWFmIFdpZHRoJylcbiAgICAgIC5zZXREZXNjKCdUaGUgd2lkdGggb2YgYSBzaW5nbGUgcGFuZSAob25seSBpZiBhdXRvIHdpZHRoIGlzIG9mZiknKVxuICAgICAgLmFkZFRleHQodGV4dCA9PiB0ZXh0LnNldFBsYWNlaG9sZGVyKCdFeGFtcGxlOiA3MDAnKVxuICAgICAgICAuc2V0VmFsdWUoKHRoaXMucGx1Z2luLnNldHRpbmdzLmxlYWZXaWR0aCB8fCAnJykgKyAnJylcbiAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmxlYWZXaWR0aCA9IHBhcnNlSW50KHZhbHVlLnRyaW0oKSk7XG4gICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZURhdGEodGhpcy5wbHVnaW4uc2V0dGluZ3MpO1xuICAgICAgICAgIHRoaXMucGx1Z2luLnJlZnJlc2goKTtcbiAgICAgICAgfSkpO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZShcIlRvZ2dsZSByb3RhdGVkIGhlYWRlcnNcIilcbiAgICAgIC5zZXREZXNjKFwiUm90YXRlcyBoZWFkZXJzIHRvIHVzZSBhcyBzcGluZXNcIilcbiAgICAgIC5hZGRUb2dnbGUodG9nZ2xlID0+IHRvZ2dsZS5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5yb3RhdGVIZWFkZXJzKVxuICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3Mucm90YXRlSGVhZGVycyA9IHZhbHVlO1xuICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVEYXRhKHRoaXMucGx1Z2luLnNldHRpbmdzKTtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5yZWZyZXNoKCk7XG4gICAgICAgIH0pKTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJTd2FwIHJvdGF0ZWQgaGVhZGVyIGRpcmVjdGlvblwiKVxuICAgICAgLnNldERlc2MoXCJTd2FwcyB0aGUgZGlyZWN0aW9uIG9mIHJvdGF0ZWQgaGVhZGVyc1wiKVxuICAgICAgLmFkZFRvZ2dsZSh0b2dnbGUgPT4gdG9nZ2xlLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmhlYWRlckFsdClcbiAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmhlYWRlckFsdCA9IHZhbHVlO1xuICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVEYXRhKHRoaXMucGx1Z2luLnNldHRpbmdzKTtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5yZWZyZXNoKCk7XG4gICAgICAgIH0pKTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJUb2dnbGUgc3RhY2tpbmdcIilcbiAgICAgIC5zZXREZXNjKFwiUGFuZXMgd2lsbCBzdGFjayB1cCB0byB0aGUgbGVmdCBhbmQgcmlnaHRcIilcbiAgICAgIC5hZGRUb2dnbGUodG9nZ2xlID0+IHRvZ2dsZS5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5zdGFja2luZ0VuYWJsZWQpXG4gICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5zdGFja2luZ0VuYWJsZWQgPSB2YWx1ZTtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XG4gICAgICAgICAgdGhpcy5wbHVnaW4ucmVmcmVzaCgpO1xuICAgICAgICB9KSk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKCdTcGluZSBXaWR0aCcpXG4gICAgICAuc2V0RGVzYygnVGhlIHdpZHRoIG9mIHRoZSByb3RhdGVkIGhlYWRlciAob3IgZ2FwKSBmb3Igc3RhY2tpbmcnKVxuICAgICAgLmFkZFRleHQodGV4dCA9PiB0ZXh0LnNldFBsYWNlaG9sZGVyKCdFeGFtcGxlOiAzMicpXG4gICAgICAgIC5zZXRWYWx1ZSgodGhpcy5wbHVnaW4uc2V0dGluZ3MuaGVhZGVyV2lkdGggfHwgJycpICsgJycpXG4gICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5oZWFkZXJXaWR0aCA9IHBhcnNlSW50KHZhbHVlLnRyaW0oKSk7XG4gICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZURhdGEodGhpcy5wbHVnaW4uc2V0dGluZ3MpO1xuICAgICAgICAgIHRoaXMucGx1Z2luLnJlZnJlc2goKTtcbiAgICAgICAgfSkpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTbGlkaW5nUGFuZXNDb21tYW5kcyB7XG4gIHBsdWdpbjogU2xpZGluZ1BhbmVzUGx1Z2luO1xuICBjb25zdHJ1Y3RvcihwbHVnaW46IFNsaWRpbmdQYW5lc1BsdWdpbikge1xuICAgIHRoaXMucGx1Z2luID0gcGx1Z2luO1xuICB9XG5cbiAgYWRkVG9nZ2xlU2V0dGluZ0NvbW1hbmQoaWQ6c3RyaW5nLCBuYW1lOnN0cmluZywgc2V0dGluZ05hbWU6c3RyaW5nKSB7XG4gICAgdGhpcy5wbHVnaW4uYWRkQ29tbWFuZCh7XG4gICAgICBpZDogaWQsXG4gICAgICBuYW1lOiBuYW1lLFxuICAgICAgY2FsbGJhY2s6ICgpID0+IHtcbiAgICAgICAgLy8gc3dpdGNoIHRoZSBzZXR0aW5nLCBzYXZlIGFuZCByZWZyZXNoXG4gICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5nc1tzZXR0aW5nTmFtZV0gPSAhdGhpcy5wbHVnaW4uc2V0dGluZ3Nbc2V0dGluZ05hbWVdO1xuICAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XG4gICAgICAgIHRoaXMucGx1Z2luLnJlZnJlc2goKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGFkZENvbW1hbmRzKCk6IHZvaWQge1xuICAgIC8vIGFkZCB0aGUgdG9nZ2xlIG9uL29mZiBjb21tYW5kXG4gICAgdGhpcy5wbHVnaW4uYWRkQ29tbWFuZCh7XG4gICAgICBpZDogJ3RvZ2dsZS1zbGlkaW5nLXBhbmVzJyxcbiAgICAgIG5hbWU6ICdUb2dnbGUgU2xpZGluZyBQYW5lcycsXG4gICAgICBjYWxsYmFjazogKCkgPT4ge1xuICAgICAgICAvLyBzd2l0Y2ggdGhlIGRpc2FibGVkIHNldHRpbmcgYW5kIHNhdmVcbiAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZGlzYWJsZWQgPSAhdGhpcy5wbHVnaW4uc2V0dGluZ3MuZGlzYWJsZWQ7XG4gICAgICAgIHRoaXMucGx1Z2luLnNhdmVEYXRhKHRoaXMucGx1Z2luLnNldHRpbmdzKTtcblxuICAgICAgICAvLyBkaXNhYmxlIG9yIGVuYWJsZSBhcyBuZWNlc3NhcnlcbiAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZGlzYWJsZWQgPyB0aGlzLnBsdWdpbi5kaXNhYmxlKCkgOiB0aGlzLnBsdWdpbi5lbmFibGUoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIGFkZCBhIGNvbW1hbmQgdG8gdG9nZ2xlIGxlYWYgYXV0byB3aWR0aFxuICAgIHRoaXMuYWRkVG9nZ2xlU2V0dGluZ0NvbW1hbmQoJ3RvZ2dsZS1zbGlkaW5nLXBhbmVzLWxlYWYtYXV0by13aWR0aCcsICdUb2dnbGUgTGVhZiBBdXRvIFdpZHRoJywgJ2xlYWZBdXRvV2lkdGgnKTtcbiAgICBcbiAgICAvLyBhZGQgYSBjb21tYW5kIHRvIHRvZ2dsZSBzdGFja2luZ1xuICAgIHRoaXMuYWRkVG9nZ2xlU2V0dGluZ0NvbW1hbmQoJ3RvZ2dsZS1zbGlkaW5nLXBhbmVzLXN0YWNraW5nJywgJ1RvZ2dsZSBTdGFja2luZycsICdzdGFja2luZ0VuYWJsZWQnKTtcblxuICAgIC8vIGFkZCBhIGNvbW1hbmQgdG8gdG9nZ2xlIHJvdGF0ZWQgaGVhZGVyc1xuICAgIHRoaXMuYWRkVG9nZ2xlU2V0dGluZ0NvbW1hbmQoJ3RvZ2dsZS1zbGlkaW5nLXBhbmVzLXJvdGF0ZWQtaGVhZGVycycsICdUb2dnbGUgUm90YXRlZCBIZWFkZXJzJywgJ3JvdGF0ZUhlYWRlcnMnKTtcblxuICAgIC8vIGFkZCBhIGNvbW1hbmQgdG8gdG9nZ2xlIHN3YXBwZWQgaGVhZGVyIGRpcmVjdGlvblxuICAgIHRoaXMuYWRkVG9nZ2xlU2V0dGluZ0NvbW1hbmQoJ3RvZ2dsZS1zbGlkaW5nLXBhbmVzLWhlYWRlci1hbHQnLCAnU3dhcCByb3RhdGVkIGhlYWRlciBkaXJlY3Rpb24nLCAnaGVhZGVyQWx0Jyk7XG4gIH1cbn0iLCJpbXBvcnQgJy4vc3R5bGVzLnNjc3MnXG5pbXBvcnQgeyBGaWxlVmlldywgUGx1Z2luLCBUQWJzdHJhY3RGaWxlLCBXb3Jrc3BhY2VMZWFmLCBXb3Jrc3BhY2VJdGVtLCBXb3Jrc3BhY2VTcGxpdCB9IGZyb20gJ29ic2lkaWFuJztcbmltcG9ydCB7IFdvcmtzcGFjZUl0ZW1FeHQgfSBmcm9tICcuL29ic2lkaWFuLWV4dCc7XG5pbXBvcnQgeyBFZGl0b3IsIFBvc2l0aW9uLCBUb2tlbiB9IGZyb20gJ2NvZGVtaXJyb3InO1xuaW1wb3J0IHsgU2xpZGluZ1BhbmVzU2V0dGluZ3MsIFNsaWRpbmdQYW5lc1NldHRpbmdUYWIsIFNsaWRpbmdQYW5lc0NvbW1hbmRzIH0gZnJvbSAnLi9zZXR0aW5ncyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2xpZGluZ1BhbmVzUGx1Z2luIGV4dGVuZHMgUGx1Z2luIHtcbiAgc2V0dGluZ3M6IFNsaWRpbmdQYW5lc1NldHRpbmdzO1xuXG4gIC8vIGhlbHBlciB2YXJpYWJsZXNcbiAgcHJpdmF0ZSBhY3RpdmVMZWFmSW5kZXg6IG51bWJlciA9IDA7XG5cbiAgLy8gaGVscGVyIGdldHMgZm9yIGFueSBjYXN0cyAoZm9yIHVuZG9jdW1lbnRlZCBBUEkgc3R1ZmYpXG4gIHByaXZhdGUgZ2V0IHJvb3RTcGxpdCgpOiBXb3Jrc3BhY2VTcGxpdCB7IHJldHVybiB0aGlzLmFwcC53b3Jrc3BhY2Uucm9vdFNwbGl0OyB9XG4gIHByaXZhdGUgZ2V0IHJvb3RTcGxpdEFueSgpOiBhbnkgeyByZXR1cm4gdGhpcy5yb290U3BsaXQgYXMgYW55OyB9XG4gIHByaXZhdGUgZ2V0IHJvb3RDb250YWluZXJFbCgpOiBIVE1MRWxlbWVudCB7IHJldHVybiAodGhpcy5hcHAud29ya3NwYWNlLnJvb3RTcGxpdCBhcyBXb3Jrc3BhY2VJdGVtIGFzIFdvcmtzcGFjZUl0ZW1FeHQpLmNvbnRhaW5lckVsOyB9XG4gIHByaXZhdGUgZ2V0IHJvb3RMZWF2ZXMoKTogV29ya3NwYWNlTGVhZltdIHtcbiAgICBjb25zdCByb290Q29udGFpbmVyRWwgPSB0aGlzLnJvb3RDb250YWluZXJFbDtcbiAgICBsZXQgcm9vdExlYXZlczogV29ya3NwYWNlTGVhZltdID0gW107XG4gICAgdGhpcy5hcHAud29ya3NwYWNlLml0ZXJhdGVSb290TGVhdmVzKChsZWFmOiBhbnkpID0+IHtcbiAgICAgIGlmIChsZWFmLmNvbnRhaW5lckVsLnBhcmVudEVsZW1lbnQgPT09IHJvb3RDb250YWluZXJFbCkge1xuICAgICAgICByb290TGVhdmVzLnB1c2gobGVhZik7XG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gcm9vdExlYXZlcztcbiAgfVxuICBwcml2YXRlIHByZXZSb290TGVhdmVzOiBXb3Jrc3BhY2VMZWFmW10gPSBbXTtcblxuICAvLyB3aGVuIHRoZSBwbHVnaW4gaXMgbG9hZGVkXG4gIGFzeW5jIG9ubG9hZCgpIHtcbiAgICAvLyBsb2FkIHNldHRpbmdzXG4gICAgdGhpcy5zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24obmV3IFNsaWRpbmdQYW5lc1NldHRpbmdzKCksIGF3YWl0IHRoaXMubG9hZERhdGEoKSk7XG5cbiAgICAvLyBpZiBpdCdzIG5vdCBkaXNhYmxlZCBpbiB0aGUgc2V0dGluZ3MsIGVuYWJsZSBpdFxuICAgIGlmICghdGhpcy5zZXR0aW5ncy5kaXNhYmxlZCkgdGhpcy5lbmFibGUoKTtcblxuICAgIC8vIGFkZCB0aGUgc2V0dGluZ3MgdGFiXG4gICAgdGhpcy5hZGRTZXR0aW5nVGFiKG5ldyBTbGlkaW5nUGFuZXNTZXR0aW5nVGFiKHRoaXMuYXBwLCB0aGlzKSk7XG4gICAgLy8gYWRkIHRoZSBjb21tYW5kc1xuICAgIG5ldyBTbGlkaW5nUGFuZXNDb21tYW5kcyh0aGlzKS5hZGRDb21tYW5kcygpO1xuICB9XG5cbiAgLy8gb24gdW5sb2FkLCBwZXJmb3JtIHRoZSBzYW1lIHN0ZXBzIGFzIGRpc2FibGVcbiAgb251bmxvYWQoKSB7XG4gICAgdGhpcy5kaXNhYmxlKCk7XG4gIH1cblxuICAvLyBlbmFibGUgYW5keSBtb2RlXG4gIGVuYWJsZSA9ICgpID0+IHtcbiAgICAvLyBhZGQgdGhlIGV2ZW50IGhhbmRsZXJzXG4gICAgdGhpcy5yZWdpc3RlckV2ZW50KHRoaXMuYXBwLndvcmtzcGFjZS5vbigncmVzaXplJywgdGhpcy5oYW5kbGVSZXNpemUpKTtcbiAgICB0aGlzLnJlZ2lzdGVyRXZlbnQodGhpcy5hcHAud29ya3NwYWNlLm9uKCdsYXlvdXQtY2hhbmdlJywgdGhpcy5oYW5kbGVMYXlvdXRDaGFuZ2UpKTtcbiAgICB0aGlzLnJlZ2lzdGVyRXZlbnQodGhpcy5hcHAud29ya3NwYWNlLm9uKCdmaWxlLW9wZW4nLCB0aGlzLmhhbmRsZUZpbGVPcGVuKSk7XG4gICAgdGhpcy5yZWdpc3RlckV2ZW50KHRoaXMuYXBwLnZhdWx0Lm9uKCdkZWxldGUnLCB0aGlzLmhhbmRsZURlbGV0ZSkpO1xuXG4gICAgLy8gd2FpdCBmb3IgbGF5b3V0IHRvIGJlIHJlYWR5IHRvIHBlcmZvcm0gdGhlIHJlc3RcbiAgICB0aGlzLmFwcC53b3Jrc3BhY2UubGF5b3V0UmVhZHkgPyB0aGlzLnJlYWxseUVuYWJsZSgpIDogdGhpcy5hcHAud29ya3NwYWNlLm9uKCdsYXlvdXQtcmVhZHknLCB0aGlzLnJlYWxseUVuYWJsZSk7XG4gIH1cblxuICAvLyByZWFsbHkgZW5hYmxlIHRoaW5ncyAob25jZSB0aGUgbGF5b3V0IGlzIHJlYWR5KVxuICByZWFsbHlFbmFibGUgPSAoKSA9PiB7XG4gICAgLy8gd2UgZG9uJ3QgbmVlZCB0aGUgZXZlbnQgaGFuZGxlciBhbnltb3JlXG4gICAgdGhpcy5hcHAud29ya3NwYWNlLm9mZignbGF5b3V0LXJlYWR5JywgdGhpcy5yZWFsbHlFbmFibGUpO1xuXG4gICAgLy8gYmFja3VwIHRoZSBmdW5jdGlvbiBzbyBJIGNhbiByZXN0b3JlIGl0XG4gICAgdGhpcy5yb290U3BsaXRBbnkub2xkT25DaGlsZFJlc2l6ZVN0YXJ0ID0gdGhpcy5yb290U3BsaXRBbnkub25DaGlsZFJlc2l6ZVN0YXJ0O1xuICAgIHRoaXMucm9vdFNwbGl0QW55Lm9uQ2hpbGRSZXNpemVTdGFydCA9IHRoaXMub25DaGlsZFJlc2l6ZVN0YXJ0O1xuXG4gICAgLy8gYWRkIHNvbWUgZXh0cmEgY2xhc3NlcyB0aGF0IGNhbid0IGZpdCBpbiB0aGUgc3R5bGVzLmNzc1xuICAgIC8vIGJlY2F1c2UgdGhleSB1c2Ugc2V0dGluZ3NcbiAgICB0aGlzLmFkZFN0eWxlKCk7XG5cbiAgICAvLyBkbyBhbGwgdGhlIGNhbHVjYXRpb25zIG5lY2Vzc2FyeSBmb3IgdGhlIHdvcmtzcGFjZSBsZWF2ZXNcbiAgICB0aGlzLnJlY2FsY3VsYXRlTGVhdmVzKCk7XG4gIH1cblxuICAvLyBzaHV0IGRvd24gYW5keSBtb2RlXG4gIGRpc2FibGUgPSAoKSA9PiB7XG5cbiAgICAvLyBnZXQgcmlkIG9mIHRoZSBleHRyYSBzdHlsZSB0YWcgd2UgYWRkZWRcbiAgICB0aGlzLnJlbW92ZVN0eWxlKCk7XG5cbiAgICAvLyBpdGVyYXRlIHRocm91Z2ggdGhlIHJvb3QgbGVhdmVzIHRvIHJlbW92ZSB0aGUgc3R1ZmYgd2UgYWRkZWRcbiAgICB0aGlzLnJvb3RMZWF2ZXMuZm9yRWFjaCh0aGlzLmNsZWFyTGVhZik7XG5cbiAgICAvLyByZXN0b3JlIHRoZSBkZWZhdWx0IGZ1bmN0aW9uYWxpdHlcbiAgICB0aGlzLnJvb3RTcGxpdEFueS5vbkNoaWxkUmVzaXplU3RhcnQgPSB0aGlzLnJvb3RTcGxpdEFueS5vbGRPbkNoaWxkUmVzaXplU3RhcnQ7XG4gIH1cblxuICBjbGVhckxlYWYgPSAobGVhZjogYW55KSA9PiB7XG4gICAgbGVhZi5jb250YWluZXJFbC5zdHlsZS53aWR0aCA9IG51bGw7XG4gICAgbGVhZi5jb250YWluZXJFbC5zdHlsZS5sZWZ0ID0gbnVsbDtcbiAgICBsZWFmLmNvbnRhaW5lckVsLnN0eWxlLnJpZ2h0ID0gbnVsbDtcbiAgICBsZWFmLmNvbnRhaW5lckVsLmNsYXNzTGlzdC5yZW1vdmUoJ21vZC1hbS1sZWZ0LW9mLWFjdGl2ZScpO1xuICAgIGxlYWYuY29udGFpbmVyRWwuY2xhc3NMaXN0LnJlbW92ZSgnbW9kLWFtLXJpZ2h0LW9mLWFjdGl2ZScpO1xuXG4gICAgY29uc3QgaWNvbkVsID0gKGxlYWYudmlldyBhcyBhbnkpLmljb25FbDtcbiAgICBjb25zdCBpY29uVGV4dDpzdHJpbmcgPSBpY29uRWwuZ2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiKTtcbiAgICBpZiAoaWNvblRleHQuaW5jbHVkZXMoXCIoXCIpKSB7XG4gICAgICBpY29uRWwuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBpY29uVGV4dC5zdWJzdHJpbmcoaWNvblRleHQubGFzdEluZGV4T2YoJygnKSArIDEsIGljb25UZXh0Lmxhc3RJbmRleE9mKCcpJykpKTtcbiAgICB9XG4gIH1cblxuICAvLyByZWZyZXNoIGZ1bmNpb24gZm9yIHdoZW4gd2UgY2hhbmdlIHNldHRpbmdzXG4gIHJlZnJlc2ggPSAoKSA9PiB7XG4gICAgLy8gcmUtbG9hZCB0aGUgc3R5bGVcbiAgICB0aGlzLnVwZGF0ZVN0eWxlKClcbiAgICAvLyByZWNhbGN1bGF0ZSBsZWFmIHBvc2l0aW9uc1xuICAgIHRoaXMucmVjYWxjdWxhdGVMZWF2ZXMoKTtcbiAgfVxuXG4gIC8vIHJlbW92ZSB0aGUgc3RseWluZyBlbGVtZW50cyB3ZSd2ZSBjcmVhdGVkXG4gIHJlbW92ZVN0eWxlID0gKCkgPT4ge1xuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsdWdpbi1zbGlkaW5nLXBhbmVzJyk7XG4gICAgaWYgKGVsKSBlbC5yZW1vdmUoKTtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3BsdWdpbi1zbGlkaW5nLXBhbmVzJyk7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdwbHVnaW4tc2xpZGluZy1wYW5lcy1yb3RhdGUtaGVhZGVyJyk7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdwbHVnaW4tc2xpZGluZy1wYW5lcy1oZWFkZXItYWx0Jyk7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdwbHVnaW4tc2xpZGluZy1wYW5lcy1zdGFja2luZycpO1xuICB9XG5cbiAgLy8gYWRkIHRoZSBzdHlsaW5nIGVsZW1lbnRzIHdlIG5lZWRcbiAgYWRkU3R5bGUgPSAoKSA9PiB7XG4gICAgLy8gYWRkIGEgY3NzIGJsb2NrIGZvciBvdXIgc2V0dGluZ3MtZGVwZW5kZW50IHN0eWxlc1xuICAgIGNvbnN0IGNzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgY3NzLmlkID0gJ3BsdWdpbi1zbGlkaW5nLXBhbmVzJztcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF0uYXBwZW5kQ2hpbGQoY3NzKTtcblxuICAgIC8vIGFkZCB0aGUgbWFpbiBjbGFzc1xuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgncGx1Z2luLXNsaWRpbmctcGFuZXMnKTtcblxuICAgIC8vIHVwZGF0ZSB0aGUgc3R5bGUgd2l0aCB0aGUgc2V0dGluZ3MtZGVwZW5kZW50IHN0eWxlc1xuICAgIHRoaXMudXBkYXRlU3R5bGUoKTtcbiAgfVxuXG4gIC8vIHVwZGF0ZSB0aGUgc3R5bGVzIChhdCB0aGUgc3RhcnQsIG9yIGFzIHRoZSByZXN1bHQgb2YgYSBzZXR0aW5ncyBjaGFuZ2UpXG4gIHVwZGF0ZVN0eWxlID0gKCkgPT4ge1xuICAgIC8vIGlmIHdlJ3ZlIGdvdCByb3RhdGUgaGVhZGVycyBvbiwgYWRkIHRoZSBjbGFzcyB3aGljaCBlbmFibGVzIGl0XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKCdwbHVnaW4tc2xpZGluZy1wYW5lcy1yb3RhdGUtaGVhZGVyJywgdGhpcy5zZXR0aW5ncy5yb3RhdGVIZWFkZXJzKTtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoJ3BsdWdpbi1zbGlkaW5nLXBhbmVzLWhlYWRlci1hbHQnLCB0aGlzLnNldHRpbmdzLmhlYWRlckFsdClcbiAgICAvLyBkbyB0aGUgc2FtZSBmb3Igc3RhY2tpbmdcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoJ3BsdWdpbi1zbGlkaW5nLXBhbmVzLXN0YWNraW5nJywgdGhpcy5zZXR0aW5ncy5zdGFja2luZ0VuYWJsZWQpO1xuICAgIFxuICAgIC8vIGdldCB0aGUgY3VzdG9tIGNzcyBlbGVtZW50XG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGx1Z2luLXNsaWRpbmctcGFuZXMnKTtcbiAgICBpZiAoIWVsKSB0aHJvdyBcInBsdWdpbi1zbGlkaW5nLXBhbmVzIGVsZW1lbnQgbm90IGZvdW5kIVwiO1xuICAgIGVsc2Uge1xuICAgICAgLy8gc2V0IHRoZSBzZXR0aW5ncy1kZXBlbmRlbnQgY3NzXG4gICAgICBlbC5pbm5lclRleHQgPSBgYm9keS5wbHVnaW4tc2xpZGluZy1wYW5lc3stLWhlYWRlci13aWR0aDoke3RoaXMuc2V0dGluZ3MuaGVhZGVyV2lkdGh9cHg7fWA7XG4gICAgICBpZiAoIXRoaXMuc2V0dGluZ3MubGVhZkF1dG9XaWR0aCkge1xuICAgICAgICBlbC5pbm5lclRleHQgKz0gYGJvZHkucGx1Z2luLXNsaWRpbmctcGFuZXMgLm1vZC1yb290Pi53b3Jrc3BhY2UtbGVhZnt3aWR0aDoke3RoaXMuc2V0dGluZ3MubGVhZldpZHRoICsgdGhpcy5zZXR0aW5ncy5oZWFkZXJXaWR0aH1weDt9YDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYW5kbGVSZXNpemUgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuYXBwLndvcmtzcGFjZS5sYXlvdXRSZWFkeSkge1xuICAgICAgdGhpcy5yZWNhbGN1bGF0ZUxlYXZlcygpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUxheW91dENoYW5nZSA9ICgpID0+IHtcbiAgICBjb25zdCByb290TGVhdmVzID0gdGhpcy5yb290TGVhdmVzO1xuICAgIGlmIChyb290TGVhdmVzLmxlbmd0aCA8IHRoaXMucHJldlJvb3RMZWF2ZXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLnByZXZSb290TGVhdmVzLmZvckVhY2goKGxlYWY6IGFueSkgPT4ge1xuICAgICAgICBpZiAoIXJvb3RMZWF2ZXMuY29udGFpbnMobGVhZikpIHtcbiAgICAgICAgICB0aGlzLmNsZWFyTGVhZihsZWFmKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgdGhpcy5wcmV2Um9vdExlYXZlcyA9IHRoaXMucm9vdExlYXZlcztcbiAgICAvL3RoaXMucmVjYWxjdWxhdGVMZWF2ZXMoKTtcbiAgfVxuXG4gIC8vIFJlY2FsY3VsYXRlIHRoZSBsZWFmIHNpemluZyBhbmQgcG9zaXRpb25zXG4gIHJlY2FsY3VsYXRlTGVhdmVzID0gKCkgPT4ge1xuICAgIC8vIHJvb3RTcGxpdC5jaGlsZHJlbiBpcyB1bmRvY3VtZW50ZWQgZm9yIG5vdywgYnV0IGl0J3MgZWFzaWVyIHRvIHVzZSBmb3Igd2hhdCB3ZSdyZSBkb2luZy5cbiAgICAvLyB3ZSBvbmx5IHdhbnQgbGVhdmVzIGF0IHRoZSByb290IG9mIHRoZSByb290IHNwbGl0XG4gICAgLy8gKHRoaXMgaXMgdG8gZml4IGNvbXBhdGliaWxpdHkgd2l0aCBiYWNrbGlua3MgaW4gZG9jdW1lbnQgYW5kIG90aGVyIHN1Y2ggcGx1Z2lucylcbiAgICBjb25zdCByb290Q29udGFpbmVyRWwgPSB0aGlzLnJvb3RDb250YWluZXJFbDtcbiAgICBjb25zdCByb290TGVhdmVzID0gdGhpcy5yb290TGVhdmVzO1xuICAgIGNvbnN0IGxlYWZDb3VudCA9IHJvb3RMZWF2ZXMubGVuZ3RoO1xuXG4gICAgbGV0IHRvdGFsV2lkdGggPSAwO1xuXG4gICAgLy8gaXRlcmF0ZSB0aHJvdWdoIGFsbCB0aGUgcm9vdC1sZXZlbCBsZWF2ZXNcbiAgICBsZXQgd2lkdGhDaGFuZ2UgPSBmYWxzZTtcbiAgICByb290TGVhdmVzLmZvckVhY2goKGxlYWY6IFdvcmtzcGFjZUxlYWYsIGk6IG51bWJlcikgPT4ge1xuXG4gICAgICAvLyBAdHMtaWdub3JlIHRvIGdldCB0aGUgdW5kb2N1bWVudGVkIGNvbnRhaW5lckVsXG4gICAgICBjb25zdCBjb250YWluZXJFbCA9IGxlYWYuY29udGFpbmVyRWw7XG5cbiAgICAgIGNvbnRhaW5lckVsLnN0eWxlLmZsZXggPSBudWxsO1xuICAgICAgY29uc3Qgb2xkV2lkdGggPSBjb250YWluZXJFbC5jbGllbnRXaWR0aDtcbiAgICAgIGlmICh0aGlzLnNldHRpbmdzLmxlYWZBdXRvV2lkdGgpIHtcbiAgICAgICAgY29udGFpbmVyRWwuc3R5bGUud2lkdGggPSAocm9vdENvbnRhaW5lckVsLmNsaWVudFdpZHRoIC0gKChsZWFmQ291bnQgLSAxKSAqIHRoaXMuc2V0dGluZ3MuaGVhZGVyV2lkdGgpKSArIFwicHhcIjtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb250YWluZXJFbC5zdHlsZS53aWR0aCA9IG51bGw7XG4gICAgICB9XG4gICAgICBpZiAob2xkV2lkdGggPT0gY29udGFpbmVyRWwuY2xpZW50V2lkdGgpIHdpZHRoQ2hhbmdlID0gdHJ1ZTtcblxuICAgICAgY29udGFpbmVyRWwuc3R5bGUubGVmdCA9IHRoaXMuc2V0dGluZ3Muc3RhY2tpbmdFbmFibGVkXG4gICAgICAgID8gKGkgKiB0aGlzLnNldHRpbmdzLmhlYWRlcldpZHRoKSArIFwicHhcIlxuICAgICAgICA6IG51bGw7XG4gICAgICBjb250YWluZXJFbC5zdHlsZS5yaWdodCA9IHRoaXMuc2V0dGluZ3Muc3RhY2tpbmdFbmFibGVkXG4gICAgICAgID8gKCgobGVhZkNvdW50IC0gaSkgKiB0aGlzLnNldHRpbmdzLmhlYWRlcldpZHRoKSAtIGNvbnRhaW5lckVsLmNsaWVudFdpZHRoKSArIFwicHhcIlxuICAgICAgICA6IG51bGw7XG4gICAgICAvLyBrZWVwIHRyYWNrIG9mIHRoZSB0b3RhbCB3aWR0aCBvZiBhbGwgbGVhdmVzXG4gICAgICB0b3RhbFdpZHRoICs9IGNvbnRhaW5lckVsLmNsaWVudFdpZHRoO1xuXG4gICAgICBjb25zdCBpY29uRWwgPSAobGVhZi52aWV3IGFzIGFueSkuaWNvbkVsO1xuICAgICAgY29uc3QgaWNvblRleHQgPSBpY29uRWwuZ2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiKTtcbiAgICAgIGlmICghaWNvblRleHQuaW5jbHVkZXMoXCIoXCIpKSB7XG4gICAgICAgIGljb25FbC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIGAke2xlYWYuZ2V0RGlzcGxheVRleHQoKX0gKCR7aWNvblRleHR9KWApO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gaWYgdGhlIHRvdGFsIHdpZHRoIG9mIGFsbCBsZWF2ZXMgaXMgbGVzcyB0aGFuIHRoZSB3aWR0aCBhdmFpbGFibGUsXG4gICAgLy8gYWRkIGJhY2sgdGhlIGZsZXggY2xhc3Mgc28gdGhleSBmaWxsIHRoZSBzcGFjZVxuICAgIGlmICh0b3RhbFdpZHRoIDwgcm9vdENvbnRhaW5lckVsLmNsaWVudFdpZHRoKSB7XG4gICAgICByb290TGVhdmVzLmZvckVhY2goKGxlYWY6IGFueSkgPT4ge1xuICAgICAgICBsZWFmLmNvbnRhaW5lckVsLnN0eWxlLmZsZXggPSAnMSAwIDAnO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYod2lkdGhDaGFuZ2UpIHRoaXMuZm9jdXNBY3RpdmVMZWFmKCF0aGlzLnNldHRpbmdzLmxlYWZBdXRvV2lkdGgpO1xuICB9XG5cbiAgLy8gdGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQsIG5vdCBvbmx5IHdoZW4gYSBmaWxlIG9wZW5zLCBidXQgd2hlbiB0aGUgYWN0aXZlIHBhbmUgaXMgc3dpdGNoZWRcbiAgaGFuZGxlRmlsZU9wZW4gPSAoZTogYW55KTogdm9pZCA9PiB7XG4gICAgLy8gcHV0IGEgc21hbGwgdGltZW91dCBvbiBpdCBiZWNhdXNlIHdoZW4gYSBmaWxlIGlzIG9wZW5lZCBvbiB0aGUgZmFyIHJpZ2h0IFxuICAgIC8vIGl0IHdhc24ndCBmb2N1c3NpbmcgcHJvcGVybHkuIFRoZSB0aW1lb3V0IGZpeGVzIHRoaXNcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIC8vIGZvY3VzIG9uIHRoZSBuZXdseSBzZWxlY3RlZCBsZWFmXG4gICAgICB0aGlzLmZvY3VzQWN0aXZlTGVhZigpO1xuICAgIH0sIDEwKTtcbiAgfTtcblxuICBmb2N1c0FjdGl2ZUxlYWYoYW5pbWF0ZWQ6IGJvb2xlYW4gPSB0cnVlKSB7XG4gICAgLy8gZ2V0IGJhY2sgdG8gdGhlIGxlYWYgd2hpY2ggaGFzIGJlZW4gYW5keSdkIChgYW55YCBiZWNhdXNlIHBhcmVudFNwbGl0IGlzIHVuZG9jdW1lbnRlZClcbiAgICBsZXQgYWN0aXZlTGVhZjogV29ya3NwYWNlSXRlbUV4dCA9IHRoaXMuYXBwLndvcmtzcGFjZS5hY3RpdmVMZWFmIGFzIFdvcmtzcGFjZUl0ZW0gYXMgV29ya3NwYWNlSXRlbUV4dDtcbiAgICB3aGlsZSAoYWN0aXZlTGVhZiAhPSBudWxsICYmIGFjdGl2ZUxlYWYucGFyZW50U3BsaXQgIT0gbnVsbCAmJiBhY3RpdmVMZWFmLnBhcmVudFNwbGl0ICE9IHRoaXMuYXBwLndvcmtzcGFjZS5yb290U3BsaXQpIHtcbiAgICAgIGFjdGl2ZUxlYWYgPSBhY3RpdmVMZWFmLnBhcmVudFNwbGl0IGFzIFdvcmtzcGFjZUl0ZW1FeHQ7XG4gICAgfVxuICAgIFxuICAgIGlmIChhY3RpdmVMZWFmICE9IG51bGwgJiYgdGhpcy5yb290U3BsaXQpIHtcblxuICAgICAgY29uc3Qgcm9vdENvbnRhaW5lckVsID0gdGhpcy5yb290Q29udGFpbmVyRWw7XG4gICAgICBjb25zdCByb290TGVhdmVzID0gdGhpcy5yb290TGVhdmVzO1xuICAgICAgY29uc3QgbGVhZkNvdW50ID0gcm9vdExlYXZlcy5sZW5ndGg7XG5cbiAgICAgIC8vIGdldCB0aGUgaW5kZXggb2YgdGhlIGFjdGl2ZSBsZWFmXG4gICAgICAvLyBhbHNvLCBnZXQgdGhlIHBvc2l0aW9uIG9mIHRoaXMgbGVhZiwgc28gd2UgY2FuIHNjcm9sbCB0byBpdFxuICAgICAgLy8gYXMgbGVhdmVzIGFyZSByZXNpemFibGUsIHdlIGhhdmUgdG8gaXRlcmF0ZSB0aHJvdWdoIGFsbCBsZWF2ZXMgdG8gdGhlXG4gICAgICAvLyBsZWZ0IHVudGlsIHdlIGdldCB0byB0aGUgYWN0aXZlIG9uZSBhbmQgYWRkIGFsbCB0aGVpciB3aWR0aHMgdG9nZXRoZXJcbiAgICAgIGxldCBwb3NpdGlvbiA9IDA7XG4gICAgICB0aGlzLmFjdGl2ZUxlYWZJbmRleCA9IC0xO1xuICAgICAgcm9vdExlYXZlcy5mb3JFYWNoKChsZWFmOiBXb3Jrc3BhY2VJdGVtLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmUgdG8gZ2V0IHRoZSB1bmRvY3VtZW50ZWQgY29udGFpbmVyRWxcbiAgICAgICAgY29uc3QgY29udGFpbmVyRWwgPSBsZWFmLmNvbnRhaW5lckVsO1xuXG4gICAgICAgIC8vIHRoaXMgaXMgdGhlIGFjdGl2ZSBvbmVcbiAgICAgICAgaWYgKGxlYWYgPT0gYWN0aXZlTGVhZikge1xuICAgICAgICAgIHRoaXMuYWN0aXZlTGVhZkluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgY29udGFpbmVyRWwuY2xhc3NMaXN0LnJlbW92ZSgnbW9kLWFtLWxlZnQtb2YtYWN0aXZlJyk7XG4gICAgICAgICAgY29udGFpbmVyRWwuY2xhc3NMaXN0LnJlbW92ZSgnbW9kLWFtLXJpZ2h0LW9mLWFjdGl2ZScpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYodGhpcy5hY3RpdmVMZWFmSW5kZXggPT0gLTEgfHwgaW5kZXggPCB0aGlzLmFjdGl2ZUxlYWZJbmRleCkge1xuICAgICAgICAgIC8vIHRoaXMgaXMgYmVmb3JlIHRoZSBhY3RpdmUgb25lLCBhZGQgdGhlIHdpZHRoXG4gICAgICAgICAgcG9zaXRpb24gKz0gY29udGFpbmVyRWwuY2xpZW50V2lkdGg7XG4gICAgICAgICAgY29udGFpbmVyRWwuY2xhc3NMaXN0LmFkZCgnbW9kLWFtLWxlZnQtb2YtYWN0aXZlJyk7XG4gICAgICAgICAgY29udGFpbmVyRWwuY2xhc3NMaXN0LnJlbW92ZSgnbW9kLWFtLXJpZ2h0LW9mLWFjdGl2ZScpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIC8vIHRoaXMgaXMgcmlnaHQgb2YgdGhlIGFjdGl2ZSBvbmVcbiAgICAgICAgICBjb250YWluZXJFbC5jbGFzc0xpc3QucmVtb3ZlKCdtb2QtYW0tbGVmdC1vZi1hY3RpdmUnKTtcbiAgICAgICAgICBjb250YWluZXJFbC5jbGFzc0xpc3QuYWRkKCdtb2QtYW0tcmlnaHQtb2YtYWN0aXZlJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgXG4gICAgICAvLyBnZXQgdGhpcyBsZWFmJ3MgbGVmdCB2YWx1ZSAodGhlIGFtb3VudCBvZiBzcGFjZSB0byB0aGUgbGVmdCBmb3Igc3RpY2t5IGhlYWRlcnMpXG4gICAgICBjb25zdCBsZWZ0ID0gcGFyc2VJbnQoYWN0aXZlTGVhZi5jb250YWluZXJFbC5zdHlsZS5sZWZ0KSB8fCAwO1xuICAgICAgLy8gdGhlIGFtb3VudCBvZiBzcGFjZSB0byB0aGUgcmlnaHQgd2UgbmVlZCB0byBsZWF2ZSBmb3Igc3RpY2t5IGhlYWRlcnNcbiAgICAgIGNvbnN0IGhlYWRlcnNUb1JpZ2h0V2lkdGggPSB0aGlzLnNldHRpbmdzLnN0YWNraW5nRW5hYmxlZCA/IChsZWFmQ291bnQgLSB0aGlzLmFjdGl2ZUxlYWZJbmRleCAtIDEpICogdGhpcy5zZXR0aW5ncy5oZWFkZXJXaWR0aCA6IDA7XG5cbiAgICAgIC8vIGl0J3MgdG9vIGZhciBsZWZ0XG4gICAgICBpZiAocm9vdENvbnRhaW5lckVsLnNjcm9sbExlZnQgPiBwb3NpdGlvbiAtIGxlZnQpIHtcbiAgICAgICAgLy8gc2Nyb2xsIHRoZSBsZWZ0IHNpZGUgb2YgdGhlIHBhbmUgaW50byB2aWV3XG4gICAgICAgIHJvb3RDb250YWluZXJFbC5zY3JvbGxUbyh7IGxlZnQ6IHBvc2l0aW9uIC0gbGVmdCwgdG9wOiAwLCBiZWhhdmlvcjogYW5pbWF0ZWQgPyAnc21vb3RoJzogJ2F1dG8nIH0pO1xuICAgICAgfVxuICAgICAgLy8gaXQncyB0b28gZmFyIHJpZ2h0XG4gICAgICBlbHNlIGlmIChyb290Q29udGFpbmVyRWwuc2Nyb2xsTGVmdCArIHJvb3RDb250YWluZXJFbC5jbGllbnRXaWR0aCA8IHBvc2l0aW9uICsgYWN0aXZlTGVhZi5jb250YWluZXJFbC5jbGllbnRXaWR0aCArIGhlYWRlcnNUb1JpZ2h0V2lkdGgpIHtcbiAgICAgICAgLy8gc2Nyb2xsIHRoZSByaWdodCBzaWRlIG9mIHRoZSBwYW5lIGludG8gdmlld1xuICAgICAgICByb290Q29udGFpbmVyRWwuc2Nyb2xsVG8oeyBsZWZ0OiBwb3NpdGlvbiArIGFjdGl2ZUxlYWYuY29udGFpbmVyRWwuY2xpZW50V2lkdGggKyBoZWFkZXJzVG9SaWdodFdpZHRoIC0gcm9vdENvbnRhaW5lckVsLmNsaWVudFdpZHRoLCB0b3A6IDAsIGJlaGF2aW9yOiBhbmltYXRlZCA/ICdzbW9vdGgnOiAnYXV0bycgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gaGFuZGUgd2hlbiBhIGZpbGUgaXMgZGVsZXRlZFxuICBoYW5kbGVEZWxldGUgPSAoZmlsZTogVEFic3RyYWN0RmlsZSkgPT4ge1xuICAgIC8vIGNsb3NlIGFueSBsZWF2ZXMgd2l0aCB0aGUgZGVsZXRlZCBmaWxlIG9wZW5cbiAgICAvLyBkZXRhY2hpbmcgYSBsZWFmIHdoaWxlIGl0ZXJhdGluZyBtZXNzZXMgd2l0aCB0aGUgaXRlcmF0aW9uXG4gICAgY29uc3QgbGVhdmVzVG9EZXRhY2g6IFdvcmtzcGFjZUxlYWZbXSA9IFtdO1xuICAgIHRoaXMuYXBwLndvcmtzcGFjZS5pdGVyYXRlUm9vdExlYXZlcygobGVhZjogV29ya3NwYWNlTGVhZikgPT4ge1xuICAgICAgaWYgKGxlYWYudmlldyBpbnN0YW5jZW9mIEZpbGVWaWV3ICYmIGxlYWYudmlldy5maWxlID09IGZpbGUpIHtcbiAgICAgICAgbGVhdmVzVG9EZXRhY2gucHVzaChsZWFmKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBsZWF2ZXNUb0RldGFjaC5mb3JFYWNoKGxlYWYgPT4gbGVhZi5kZXRhY2goKSk7XG4gIH07XG5cbiAgLy8gb3ZlcnJpZGVuIGZ1bmN0aW9uIGZvciByb290U3BsaXQgY2hpbGQgcmVzaXplXG4gIG9uQ2hpbGRSZXNpemVTdGFydCA9IChsZWFmOiBhbnksIGV2ZW50OiBhbnkpID0+IHtcblxuICAgIC8vIG9ubHkgcmVhbGx5IGFwcGx5IHRoaXMgdG8gdmVydGljYWwgc3BsaXRzXG4gICAgaWYgKHRoaXMucm9vdFNwbGl0QW55LmRpcmVjdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiKSB7XG4gICAgICAvLyB0aGlzIGlzIHRoZSB3aWR0aCB0aGUgbGVhZiBzdGFydGVkIGF0IGJlZm9yZSByZXNpemVcbiAgICAgIGNvbnN0IHN0YXJ0V2lkdGggPSBsZWFmLmNvbnRhaW5lckVsLmNsaWVudFdpZHRoO1xuXG4gICAgICAvLyB0aGUgbW91c2Vtb3ZlIGV2ZW50IHRvIHRyaWdnZXIgd2hpbGUgcmVzaXppbmdcbiAgICAgIGNvbnN0IG1vdXNlbW92ZSA9IChlOiBhbnkpID0+IHtcbiAgICAgICAgLy8gZ2V0IHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gdGhlIGZpcnN0IHBvc2l0aW9uIGFuZCBjdXJyZW50XG4gICAgICAgIGNvbnN0IGRlbHRhWCA9IGUucGFnZVggLSBldmVudC5wYWdlWDtcbiAgICAgICAgLy8gYWRqdXN0IHRoZSBzdGFydCB3aWR0aCBieSB0aGUgZGVsdGFcbiAgICAgICAgbGVhZi5jb250YWluZXJFbC5zdHlsZS53aWR0aCA9IGAke3N0YXJ0V2lkdGggKyBkZWx0YVh9cHhgO1xuICAgICAgfVxuXG4gICAgICAvLyB0aGUgbW91c2V1cCBldmVudCB0byB0cmlnZ2VyIGF0IHRoZSBlbmQgb2YgcmVzaXppbmdcbiAgICAgIGNvbnN0IG1vdXNldXAgPSAoKSA9PiB7XG4gICAgICAgIC8vIGlmIHN0YWNraW5nIGlzIGVuYWJsZWQsIHdlIG5lZWQgdG8gcmUtamlnIHRoZSBcInJpZ2h0XCIgdmFsdWVcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3Muc3RhY2tpbmdFbmFibGVkKSB7XG4gICAgICAgICAgLy8gd2UgbmVlZCB0aGUgbGVhZiBjb3VudCBhbmQgaW5kZXggdG8gY2FsY3VsYXRlIHRoZSBjb3JyZWN0IHZhbHVlXG4gICAgICAgICAgY29uc3Qgcm9vdExlYXZlcyA9IHRoaXMucm9vdExlYXZlcztcbiAgICAgICAgICBjb25zdCBsZWFmQ291bnQgPSByb290TGVhdmVzLmxlbmd0aDtcbiAgICAgICAgICBjb25zdCBsZWFmSW5kZXggPSByb290TGVhdmVzLmZpbmRJbmRleCgobDogYW55KSA9PiBsID09IGxlYWYpO1xuICAgICAgICAgIGxlYWYuY29udGFpbmVyRWwuc3R5bGUucmlnaHQgPSAoKChsZWFmQ291bnQgLSBsZWFmSW5kZXggLSAxKSAqIHRoaXMuc2V0dGluZ3MuaGVhZGVyV2lkdGgpIC0gbGVhZi5jb250YWluZXJFbC5jbGllbnRXaWR0aCkgKyBcInB4XCI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZW1vdmUgdGhlc2UgZXZlbnQgbGlzdGVuZXJzLiBXZSdyZSBkb25lIHdpdGggdGhlbVxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIG1vdXNlbW92ZSk7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIG1vdXNldXApO1xuICAgICAgfVxuXG4gICAgICAvLyBBZGQgdGhlIGFib3ZlIHR3byBldmVudCBsaXN0ZW5lcnNcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgbW91c2Vtb3ZlKTtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIG1vdXNldXApO1xuICAgIH1cbiAgfVxufSJdLCJuYW1lcyI6WyJTZXR0aW5nIiwiUGx1Z2luU2V0dGluZ1RhYiIsIkZpbGVWaWV3IiwiUGx1Z2luIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGFBQWEsR0FBRyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDbkMsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLGNBQWM7QUFDekMsU0FBUyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsWUFBWSxLQUFLLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ3BGLFFBQVEsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQzFHLElBQUksT0FBTyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQy9CLENBQUMsQ0FBQztBQUNGO0FBQ08sU0FBUyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNoQyxJQUFJLElBQUksT0FBTyxDQUFDLEtBQUssVUFBVSxJQUFJLENBQUMsS0FBSyxJQUFJO0FBQzdDLFFBQVEsTUFBTSxJQUFJLFNBQVMsQ0FBQyxzQkFBc0IsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsK0JBQStCLENBQUMsQ0FBQztBQUNsRyxJQUFJLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDeEIsSUFBSSxTQUFTLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEVBQUU7QUFDM0MsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3pGLENBQUM7QUF1Q0Q7QUFDTyxTQUFTLFNBQVMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUU7QUFDN0QsSUFBSSxTQUFTLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxPQUFPLEtBQUssWUFBWSxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLFVBQVUsT0FBTyxFQUFFLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7QUFDaEgsSUFBSSxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsRUFBRSxVQUFVLE9BQU8sRUFBRSxNQUFNLEVBQUU7QUFDL0QsUUFBUSxTQUFTLFNBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0FBQ25HLFFBQVEsU0FBUyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0FBQ3RHLFFBQVEsU0FBUyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsTUFBTSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUFFO0FBQ3RILFFBQVEsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFVBQVUsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzlFLEtBQUssQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUNEO0FBQ08sU0FBUyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRTtBQUMzQyxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDckgsSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxNQUFNLEtBQUssVUFBVSxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsV0FBVyxFQUFFLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUM3SixJQUFJLFNBQVMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLE9BQU8sVUFBVSxDQUFDLEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ3RFLElBQUksU0FBUyxJQUFJLENBQUMsRUFBRSxFQUFFO0FBQ3RCLFFBQVEsSUFBSSxDQUFDLEVBQUUsTUFBTSxJQUFJLFNBQVMsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0FBQ3RFLFFBQVEsT0FBTyxDQUFDLEVBQUUsSUFBSTtBQUN0QixZQUFZLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3pLLFlBQVksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNwRCxZQUFZLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN6QixnQkFBZ0IsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsTUFBTTtBQUM5QyxnQkFBZ0IsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO0FBQ3hFLGdCQUFnQixLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTO0FBQ2pFLGdCQUFnQixLQUFLLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxTQUFTO0FBQ2pFLGdCQUFnQjtBQUNoQixvQkFBb0IsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRTtBQUNoSSxvQkFBb0IsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRTtBQUMxRyxvQkFBb0IsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFO0FBQ3pGLG9CQUFvQixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUU7QUFDdkYsb0JBQW9CLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDMUMsb0JBQW9CLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxTQUFTO0FBQzNDLGFBQWE7QUFDYixZQUFZLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN2QyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7QUFDbEUsUUFBUSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDO0FBQ3pGLEtBQUs7QUFDTDs7QUNoR0E7SUFBQTtRQUNFLGdCQUFXLEdBQVcsRUFBRSxDQUFDO1FBQ3pCLGNBQVMsR0FBVyxHQUFHLENBQUM7UUFDeEIsa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFDL0IsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUMxQixrQkFBYSxHQUFZLElBQUksQ0FBQztRQUM5QixjQUFTLEdBQVksS0FBSyxDQUFDO1FBQzNCLG9CQUFlLEdBQVksSUFBSSxDQUFDO0tBQ2pDO0lBQUQsMkJBQUM7QUFBRCxDQUFDLElBQUE7QUFFRDtJQUE0QywwQ0FBZ0I7SUFHMUQsZ0NBQVksR0FBUSxFQUFFLE1BQTBCO1FBQWhELFlBQ0Usa0JBQU0sR0FBRyxFQUFFLE1BQU0sQ0FBQyxTQUVuQjtRQURDLEtBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDOztLQUN0QjtJQUVELHdDQUFPLEdBQVA7UUFBQSxpQkFpRkM7UUFoRk8sSUFBQSxXQUFXLEdBQUssSUFBSSxZQUFULENBQVU7UUFFM0IsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRXBCLElBQUlBLGdCQUFPLENBQUMsV0FBVyxDQUFDO2FBQ3JCLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQzthQUMvQixPQUFPLENBQUMsd0NBQXdDLENBQUM7YUFDakQsU0FBUyxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQzthQUNqRSxRQUFRLENBQUMsVUFBQyxLQUFLO1lBQ2QsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLENBQUMsS0FBSyxDQUFDO1lBQ3ZDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDM0MsSUFBSSxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUU7Z0JBQ2pDLEtBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDdkI7aUJBQ0k7Z0JBQ0gsS0FBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUN0QjtTQUNGLENBQUMsR0FBQSxDQUFDLENBQUM7UUFFUixJQUFJQSxnQkFBTyxDQUFDLFdBQVcsQ0FBQzthQUNyQixPQUFPLENBQUMsaUJBQWlCLENBQUM7YUFDMUIsT0FBTyxDQUFDLDhEQUE4RCxDQUFDO2FBQ3ZFLFNBQVMsQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDO2FBQ3JFLFFBQVEsQ0FBQyxVQUFDLEtBQUs7WUFDZCxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1lBQzNDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDM0MsS0FBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUN2QixDQUFDLEdBQUEsQ0FBQyxDQUFDO1FBRVIsSUFBSUEsZ0JBQU8sQ0FBQyxXQUFXLENBQUM7YUFDckIsT0FBTyxDQUFDLFlBQVksQ0FBQzthQUNyQixPQUFPLENBQUMsd0RBQXdELENBQUM7YUFDakUsT0FBTyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUM7YUFDakQsUUFBUSxDQUFDLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUM7YUFDckQsUUFBUSxDQUFDLFVBQUMsS0FBSztZQUNkLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7WUFDeEQsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMzQyxLQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ3ZCLENBQUMsR0FBQSxDQUFDLENBQUM7UUFFUixJQUFJQSxnQkFBTyxDQUFDLFdBQVcsQ0FBQzthQUNyQixPQUFPLENBQUMsd0JBQXdCLENBQUM7YUFDakMsT0FBTyxDQUFDLGtDQUFrQyxDQUFDO2FBQzNDLFNBQVMsQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDO2FBQ3JFLFFBQVEsQ0FBQyxVQUFDLEtBQUs7WUFDZCxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1lBQzNDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDM0MsS0FBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUN2QixDQUFDLEdBQUEsQ0FBQyxDQUFDO1FBRVIsSUFBSUEsZ0JBQU8sQ0FBQyxXQUFXLENBQUM7YUFDckIsT0FBTyxDQUFDLCtCQUErQixDQUFDO2FBQ3hDLE9BQU8sQ0FBQyx3Q0FBd0MsQ0FBQzthQUNqRCxTQUFTLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQzthQUNqRSxRQUFRLENBQUMsVUFBQyxLQUFLO1lBQ2QsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN2QyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzNDLEtBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDdkIsQ0FBQyxHQUFBLENBQUMsQ0FBQztRQUVSLElBQUlBLGdCQUFPLENBQUMsV0FBVyxDQUFDO2FBQ3JCLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQzthQUMxQixPQUFPLENBQUMsMkNBQTJDLENBQUM7YUFDcEQsU0FBUyxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUM7YUFDdkUsUUFBUSxDQUFDLFVBQUMsS0FBSztZQUNkLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7WUFDN0MsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMzQyxLQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ3ZCLENBQUMsR0FBQSxDQUFDLENBQUM7UUFFUixJQUFJQSxnQkFBTyxDQUFDLFdBQVcsQ0FBQzthQUNyQixPQUFPLENBQUMsYUFBYSxDQUFDO2FBQ3RCLE9BQU8sQ0FBQyx1REFBdUQsQ0FBQzthQUNoRSxPQUFPLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQzthQUNoRCxRQUFRLENBQUMsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQzthQUN2RCxRQUFRLENBQUMsVUFBQyxLQUFLO1lBQ2QsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUMxRCxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzNDLEtBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDdkIsQ0FBQyxHQUFBLENBQUMsQ0FBQztLQUNUO0lBQ0gsNkJBQUM7QUFBRCxDQTFGQSxDQUE0Q0MseUJBQWdCLEdBMEYzRDtBQUVEO0lBRUUsOEJBQVksTUFBMEI7UUFDcEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7S0FDdEI7SUFFRCxzREFBdUIsR0FBdkIsVUFBd0IsRUFBUyxFQUFFLElBQVcsRUFBRSxXQUFrQjtRQUFsRSxpQkFZQztRQVhDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO1lBQ3JCLEVBQUUsRUFBRSxFQUFFO1lBQ04sSUFBSSxFQUFFLElBQUk7WUFDVixRQUFRLEVBQUU7OztnQkFHUixLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUN2RSxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUMzQyxLQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ3ZCO1NBQ0YsQ0FBQyxDQUFDO0tBQ0o7SUFFRCwwQ0FBVyxHQUFYO1FBQUEsaUJBMEJDOztRQXhCQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztZQUNyQixFQUFFLEVBQUUsc0JBQXNCO1lBQzFCLElBQUksRUFBRSxzQkFBc0I7WUFDNUIsUUFBUSxFQUFFOztnQkFFUixLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7Z0JBQy9ELEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7O2dCQUczQyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQzlFO1NBQ0YsQ0FBQyxDQUFDOztRQUdILElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxzQ0FBc0MsRUFBRSx3QkFBd0IsRUFBRSxlQUFlLENBQUMsQ0FBQzs7UUFHaEgsSUFBSSxDQUFDLHVCQUF1QixDQUFDLCtCQUErQixFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixDQUFDLENBQUM7O1FBR3BHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxzQ0FBc0MsRUFBRSx3QkFBd0IsRUFBRSxlQUFlLENBQUMsQ0FBQzs7UUFHaEgsSUFBSSxDQUFDLHVCQUF1QixDQUFDLGlDQUFpQyxFQUFFLCtCQUErQixFQUFFLFdBQVcsQ0FBQyxDQUFDO0tBQy9HO0lBQ0gsMkJBQUM7QUFBRCxDQUFDOzs7SUN2SitDLHNDQUFNO0lBQXREO1FBQUEscUVBdVZDOztRQW5WUyxxQkFBZSxHQUFXLENBQUMsQ0FBQztRQWdCNUIsb0JBQWMsR0FBb0IsRUFBRSxDQUFDOztRQXNCN0MsWUFBTSxHQUFHOztZQUVQLEtBQUksQ0FBQyxhQUFhLENBQUMsS0FBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxLQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUN2RSxLQUFJLENBQUMsYUFBYSxDQUFDLEtBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUUsS0FBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztZQUNwRixLQUFJLENBQUMsYUFBYSxDQUFDLEtBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsS0FBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDNUUsS0FBSSxDQUFDLGFBQWEsQ0FBQyxLQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLEtBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDOztZQUduRSxLQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsS0FBSSxDQUFDLFlBQVksRUFBRSxHQUFHLEtBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxjQUFjLEVBQUUsS0FBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ2pILENBQUE7O1FBR0Qsa0JBQVksR0FBRzs7WUFFYixLQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLEtBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzs7WUFHMUQsS0FBSSxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDO1lBQy9FLEtBQUksQ0FBQyxZQUFZLENBQUMsa0JBQWtCLEdBQUcsS0FBSSxDQUFDLGtCQUFrQixDQUFDOzs7WUFJL0QsS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDOztZQUdoQixLQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztTQUMxQixDQUFBOztRQUdELGFBQU8sR0FBRzs7WUFHUixLQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7O1lBR25CLEtBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzs7WUFHeEMsS0FBSSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDLHFCQUFxQixDQUFDO1NBQ2hGLENBQUE7UUFFRCxlQUFTLEdBQUcsVUFBQyxJQUFTO1lBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDcEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNuQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBQzNELElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBRTVELElBQU0sTUFBTSxHQUFJLElBQUksQ0FBQyxJQUFZLENBQUMsTUFBTSxDQUFDO1lBQ3pDLElBQU0sUUFBUSxHQUFVLE1BQU0sQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDMUQsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUMxQixNQUFNLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2pIO1NBQ0YsQ0FBQTs7UUFHRCxhQUFPLEdBQUc7O1lBRVIsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFBOztZQUVsQixLQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztTQUMxQixDQUFBOztRQUdELGlCQUFXLEdBQUc7WUFDWixJQUFNLEVBQUUsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFDM0QsSUFBSSxFQUFFO2dCQUFFLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNwQixRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUN2RCxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsb0NBQW9DLENBQUMsQ0FBQztZQUNyRSxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsaUNBQWlDLENBQUMsQ0FBQztZQUNsRSxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsK0JBQStCLENBQUMsQ0FBQztTQUNqRSxDQUFBOztRQUdELGNBQVEsR0FBRzs7WUFFVCxJQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsc0JBQXNCLENBQUM7WUFDaEMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7WUFHMUQsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7O1lBR3BELEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNwQixDQUFBOztRQUdELGlCQUFXLEdBQUc7O1lBRVosUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLG9DQUFvQyxFQUFFLEtBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDbEcsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGlDQUFpQyxFQUFFLEtBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUE7O1lBRTFGLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQywrQkFBK0IsRUFBRSxLQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDOztZQUcvRixJQUFNLEVBQUUsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFDM0QsSUFBSSxDQUFDLEVBQUU7Z0JBQUUsTUFBTSx5Q0FBeUMsQ0FBQztpQkFDcEQ7O2dCQUVILEVBQUUsQ0FBQyxTQUFTLEdBQUcsOENBQTRDLEtBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxTQUFNLENBQUM7Z0JBQzNGLElBQUksQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRTtvQkFDaEMsRUFBRSxDQUFDLFNBQVMsSUFBSSxnRUFBNkQsS0FBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLFVBQU0sQ0FBQztpQkFDeEk7YUFDRjtTQUNGLENBQUE7UUFFRCxrQkFBWSxHQUFHO1lBQ2IsSUFBSSxLQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUU7Z0JBQ2xDLEtBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2FBQzFCO1NBQ0YsQ0FBQTtRQUVELHdCQUFrQixHQUFHO1lBQ25CLElBQU0sVUFBVSxHQUFHLEtBQUksQ0FBQyxVQUFVLENBQUM7WUFDbkMsSUFBSSxVQUFVLENBQUMsTUFBTSxHQUFHLEtBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFO2dCQUNsRCxLQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQVM7b0JBQ3BDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO3dCQUM5QixLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUN0QjtpQkFDRixDQUFDLENBQUE7YUFDSDtZQUNELEtBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSSxDQUFDLFVBQVUsQ0FBQzs7U0FFdkMsQ0FBQTs7UUFHRCx1QkFBaUIsR0FBRzs7OztZQUlsQixJQUFNLGVBQWUsR0FBRyxLQUFJLENBQUMsZUFBZSxDQUFDO1lBQzdDLElBQU0sVUFBVSxHQUFHLEtBQUksQ0FBQyxVQUFVLENBQUM7WUFDbkMsSUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQztZQUVwQyxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUM7O1lBR25CLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQztZQUN4QixVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBbUIsRUFBRSxDQUFTOztnQkFHaEQsSUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztnQkFFckMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO2dCQUM5QixJQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsV0FBVyxDQUFDO2dCQUN6QyxJQUFJLEtBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFO29CQUMvQixXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLGVBQWUsQ0FBQyxXQUFXLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLEtBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksSUFBSSxDQUFDO2lCQUNoSDtxQkFDSTtvQkFDSCxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7aUJBQ2hDO2dCQUNELElBQUksUUFBUSxJQUFJLFdBQVcsQ0FBQyxXQUFXO29CQUFFLFdBQVcsR0FBRyxJQUFJLENBQUM7Z0JBRTVELFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUMsZUFBZTtzQkFDbEQsQ0FBQyxDQUFDLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLElBQUksSUFBSTtzQkFDdEMsSUFBSSxDQUFDO2dCQUNULFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUMsZUFBZTtzQkFDbkQsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxLQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsSUFBSSxXQUFXLENBQUMsV0FBVyxJQUFJLElBQUk7c0JBQ2hGLElBQUksQ0FBQzs7Z0JBRVQsVUFBVSxJQUFJLFdBQVcsQ0FBQyxXQUFXLENBQUM7Z0JBRXRDLElBQU0sTUFBTSxHQUFJLElBQUksQ0FBQyxJQUFZLENBQUMsTUFBTSxDQUFDO2dCQUN6QyxJQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUNuRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDM0IsTUFBTSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUssSUFBSSxDQUFDLGNBQWMsRUFBRSxVQUFLLFFBQVEsTUFBRyxDQUFDLENBQUM7aUJBQzdFO2FBQ0YsQ0FBQyxDQUFDOzs7WUFJSCxJQUFJLFVBQVUsR0FBRyxlQUFlLENBQUMsV0FBVyxFQUFFO2dCQUM1QyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBUztvQkFDM0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztpQkFDdkMsQ0FBQyxDQUFDO2FBQ0o7WUFFRCxJQUFHLFdBQVc7Z0JBQUUsS0FBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDcEUsQ0FBQTs7UUFHRCxvQkFBYyxHQUFHLFVBQUMsQ0FBTTs7O1lBR3RCLFVBQVUsQ0FBQzs7Z0JBRVQsS0FBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO2FBQ3hCLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDUixDQUFDOztRQStERixrQkFBWSxHQUFHLFVBQUMsSUFBbUI7OztZQUdqQyxJQUFNLGNBQWMsR0FBb0IsRUFBRSxDQUFDO1lBQzNDLEtBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLFVBQUMsSUFBbUI7Z0JBQ3ZELElBQUksSUFBSSxDQUFDLElBQUksWUFBWUMsaUJBQVEsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUU7b0JBQzNELGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQzNCO2FBQ0YsQ0FBQyxDQUFDO1lBQ0gsY0FBYyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBQSxDQUFDLENBQUM7U0FDL0MsQ0FBQzs7UUFHRix3QkFBa0IsR0FBRyxVQUFDLElBQVMsRUFBRSxLQUFVOztZQUd6QyxJQUFJLEtBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxLQUFLLFVBQVUsRUFBRTs7Z0JBRTlDLElBQU0sWUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDOztnQkFHaEQsSUFBTSxXQUFTLEdBQUcsVUFBQyxDQUFNOztvQkFFdkIsSUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDOztvQkFFckMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFNLFlBQVUsR0FBRyxNQUFNLE9BQUksQ0FBQztpQkFDM0QsQ0FBQTs7Z0JBR0QsSUFBTSxTQUFPLEdBQUc7O29CQUVkLElBQUksS0FBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUU7O3dCQUVqQyxJQUFNLFVBQVUsR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDO3dCQUNuQyxJQUFNLFNBQVMsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDO3dCQUNwQyxJQUFNLFNBQVMsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQUMsQ0FBTSxJQUFLLE9BQUEsQ0FBQyxJQUFJLElBQUksR0FBQSxDQUFDLENBQUM7d0JBQzlELElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxHQUFHLENBQUMsSUFBSSxLQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUM7cUJBQ2xJOztvQkFHRCxRQUFRLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLFdBQVMsQ0FBQyxDQUFDO29CQUNyRCxRQUFRLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLFNBQU8sQ0FBQyxDQUFDO2lCQUNsRCxDQUFBOztnQkFHRCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLFdBQVMsQ0FBQyxDQUFDO2dCQUNsRCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFNBQU8sQ0FBQyxDQUFDO2FBQy9DO1NBQ0YsQ0FBQTs7S0FDRjtJQWhWQyxzQkFBWSx5Q0FBUzs7YUFBckIsY0FBMEMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRTs7O09BQUE7SUFDaEYsc0JBQVksNENBQVk7YUFBeEIsY0FBa0MsT0FBTyxJQUFJLENBQUMsU0FBZ0IsQ0FBQyxFQUFFOzs7T0FBQTtJQUNqRSxzQkFBWSwrQ0FBZTthQUEzQixjQUE2QyxPQUFRLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFNBQStDLENBQUMsV0FBVyxDQUFDLEVBQUU7OztPQUFBO0lBQ3RJLHNCQUFZLDBDQUFVO2FBQXRCO1lBQ0UsSUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztZQUM3QyxJQUFJLFVBQVUsR0FBb0IsRUFBRSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLFVBQUMsSUFBUztnQkFDN0MsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsS0FBSyxlQUFlLEVBQUU7b0JBQ3RELFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ3ZCO2FBQ0YsQ0FBQyxDQUFBO1lBQ0YsT0FBTyxVQUFVLENBQUM7U0FDbkI7OztPQUFBOztJQUlLLG1DQUFNLEdBQVo7Ozs7Ozs7d0JBRUUsS0FBQSxJQUFJLENBQUE7d0JBQVksS0FBQSxDQUFBLEtBQUEsTUFBTSxFQUFDLE1BQU0sQ0FBQTs4QkFBQyxJQUFJLG9CQUFvQixFQUFFO3dCQUFFLHFCQUFNLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBQTs7O3dCQUEvRSxHQUFLLFFBQVEsR0FBRyx3QkFBMEMsU0FBcUIsR0FBQyxDQUFDOzt3QkFHakYsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUTs0QkFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7O3dCQUczQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksc0JBQXNCLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDOzt3QkFFL0QsSUFBSSxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7Ozs7S0FDOUM7O0lBR0QscUNBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUNoQjtJQWtNRCw0Q0FBZSxHQUFmLFVBQWdCLFFBQXdCO1FBQXhDLGlCQTBEQztRQTFEZSx5QkFBQSxFQUFBLGVBQXdCOztRQUV0QyxJQUFJLFVBQVUsR0FBcUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsVUFBK0MsQ0FBQztRQUN0RyxPQUFPLFVBQVUsSUFBSSxJQUFJLElBQUksVUFBVSxDQUFDLFdBQVcsSUFBSSxJQUFJLElBQUksVUFBVSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUU7WUFDckgsVUFBVSxHQUFHLFVBQVUsQ0FBQyxXQUErQixDQUFDO1NBQ3pEO1FBRUQsSUFBSSxVQUFVLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFFeEMsSUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztZQUM3QyxJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQ25DLElBQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUM7Ozs7O1lBTXBDLElBQUksVUFBUSxHQUFHLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzFCLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFtQixFQUFFLEtBQWE7O2dCQUVwRCxJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDOztnQkFHckMsSUFBSSxJQUFJLElBQUksVUFBVSxFQUFFO29CQUN0QixLQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztvQkFDN0IsV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUMsQ0FBQztvQkFDdEQsV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsd0JBQXdCLENBQUMsQ0FBQztpQkFDeEQ7cUJBQ0ksSUFBRyxLQUFJLENBQUMsZUFBZSxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssR0FBRyxLQUFJLENBQUMsZUFBZSxFQUFFOztvQkFFbEUsVUFBUSxJQUFJLFdBQVcsQ0FBQyxXQUFXLENBQUM7b0JBQ3BDLFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7b0JBQ25ELFdBQVcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLHdCQUF3QixDQUFDLENBQUM7aUJBQ3hEO3FCQUNJOztvQkFFSCxXQUFXLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO29CQUN0RCxXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO2lCQUNyRDthQUNGLENBQUMsQ0FBQzs7WUFHSCxJQUFNLElBQUksR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOztZQUU5RCxJQUFNLG1CQUFtQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQzs7WUFHbkksSUFBSSxlQUFlLENBQUMsVUFBVSxHQUFHLFVBQVEsR0FBRyxJQUFJLEVBQUU7O2dCQUVoRCxlQUFlLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVEsR0FBRyxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsUUFBUSxHQUFHLFFBQVEsR0FBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO2FBQ3BHOztpQkFFSSxJQUFJLGVBQWUsQ0FBQyxVQUFVLEdBQUcsZUFBZSxDQUFDLFdBQVcsR0FBRyxVQUFRLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEdBQUcsbUJBQW1CLEVBQUU7O2dCQUV2SSxlQUFlLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVEsR0FBRyxVQUFVLENBQUMsV0FBVyxDQUFDLFdBQVcsR0FBRyxtQkFBbUIsR0FBRyxlQUFlLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLFFBQVEsR0FBRyxRQUFRLEdBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQzthQUN0TDtTQUNGO0tBQ0Y7SUFvREgseUJBQUM7QUFBRCxDQXZWQSxDQUFnREMsZUFBTTs7OzsifQ==
