webpackJsonp([0],{

/***/ 268:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewPageModule", function() { return ViewPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__view__ = __webpack_require__(269);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ViewPageModule = /** @class */ (function () {
    function ViewPageModule() {
    }
    ViewPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__view__["a" /* ViewPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__view__["a" /* ViewPage */]),
            ],
        })
    ], ViewPageModule);
    return ViewPageModule;
}());

//# sourceMappingURL=view.module.js.map

/***/ }),

/***/ 269:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(99);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ViewPage = /** @class */ (function () {
    function ViewPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        /** 벌고있는 돈 */
        this.earning = {
            calc: 0,
            show: '0',
            module: '0',
        };
        if (navParams.get('data') === undefined)
            navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
        else {
            this.resultVal = navParams.get('data');
            this.realtimeRefresh();
        }
    }
    ViewPage.prototype.ionViewDidLoad = function () {
        if (this.resultVal !== undefined) {
            this.resultVal.salary = Number(this.resultVal.salary);
            if (this.resultVal.payTerm == '연봉') {
                this.resultVal.salary /= 12;
            }
            this.resultVal.salary *= 10000;
            this.setCourse();
        }
    };
    /** 시작점, 끝점 파악하기 */
    ViewPage.prototype.setCourse = function () {
        var now = new Date().toLocaleDateString('ko');
        var sep = now.split('.');
        var sep2 = now.split('.');
        if (Number(sep[2]) < this.resultVal.payday) {
            sep[1] = ' ' + (Number(sep[1]) - 1 || 12).toString();
            sep[2] = ' ' + this.resultVal.payday;
            sep2[2] = ' ' + this.resultVal.payday;
        }
        else {
            sep[2] = ' ' + this.resultVal.payday;
            sep2[1] = ' ' + (Number(sep[1]) + 1 > 13 ? 1 : Number(sep[1]) + 1).toString();
            sep2[2] = ' ' + this.resultVal.payday;
        }
        this.lastMonth = new Date(sep.join());
        this.fastestPayday = new Date(sep2.join());
    };
    /** 프레임처리 */
    ViewPage.prototype.realtimeRefresh = function () {
        var _this = this;
        this.refresh = setInterval(function () {
            var now = new Date().getTime();
            var day = new Date().getDate();
            if (day == _this.resultVal.payday)
                _this.setCourse();
            _this.earning.calc = _this.resultVal.salary * (now - _this.lastMonth) / (_this.fastestPayday - _this.lastMonth);
            var tmp = Number(_this.earning.calc.toFixed(2)).toLocaleString('ko').split('.');
            if (tmp[1] !== undefined) {
                if (tmp[1].length == 1)
                    tmp[1] += '0';
            }
            else {
                tmp[1] = '00';
            }
            _this.earning.show = tmp[0];
            _this.earning.module = tmp[1];
        }, 73);
    };
    ViewPage.prototype.ionViewWillLeave = function () {
        clearInterval(this.refresh);
        if (this.resultVal !== undefined) {
            if (this.resultVal.payTerm == '연봉')
                this.resultVal.salary *= 12;
            this.resultVal.salary /= 10000;
            this.resultVal.salary = Math.round(this.resultVal.salary);
        }
    };
    ViewPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-view',template:/*ion-inline-start:"/home/liss22/real_time_salary/src/pages/view/view.html"*/'<ion-content padding>\n  <div *ngIf="resultVal!==undeifined">\n    <ion-list>\n      <div>\n        당신이 {{resultVal.payday}}일부터 지금까지...\n      </div>\n      <ion-item>\n        <ion-label>이번달에 벌고있는 돈</ion-label>\n        <div item-right style="margin: 0;">{{earning.show}}</div>\n        <div item-right style="margin: 0;font-size: 14px;color: #bbbbbb">.{{earning.module}}</div>\n        <div item-right>원</div>\n      </ion-item>\n    </ion-list>\n    <!-- <ion-list>\n      <div>\n        당신이 마음놓고 할 수 있는...\n      </div>\n      <ion-item>\n        <ion-label>치킨 한 마리</ion-label>\n        <div item-right>{{resultVal.payday}}시간</div>\n      </ion-item>\n    </ion-list> -->\n  </div>\n  <ion-item text-center>이 고통을 친구들과 나누기</ion-item>\n  <ion-item (click)="navCtrl.pop()" text-center>눈물을 머금고 돌아가기</ion-item>\n</ion-content>'/*ion-inline-end:"/home/liss22/real_time_salary/src/pages/view/view.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */]])
    ], ViewPage);
    return ViewPage;
}());

//# sourceMappingURL=view.js.map

/***/ })

});
//# sourceMappingURL=0.js.map