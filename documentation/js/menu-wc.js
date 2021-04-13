'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">products-api documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/OptionsModule.html" data-type="entity-link">OptionsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-OptionsModule-ca09bdd015befdfbdd245dece8aa6b56"' : 'data-target="#xs-controllers-links-module-OptionsModule-ca09bdd015befdfbdd245dece8aa6b56"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-OptionsModule-ca09bdd015befdfbdd245dece8aa6b56"' :
                                            'id="xs-controllers-links-module-OptionsModule-ca09bdd015befdfbdd245dece8aa6b56"' }>
                                            <li class="link">
                                                <a href="controllers/OptionsController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OptionsController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductsModule.html" data-type="entity-link">ProductsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ProductsModule-511757170a2f0e9cccc1e6e42e54675f"' : 'data-target="#xs-controllers-links-module-ProductsModule-511757170a2f0e9cccc1e6e42e54675f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductsModule-511757170a2f0e9cccc1e6e42e54675f"' :
                                            'id="xs-controllers-links-module-ProductsModule-511757170a2f0e9cccc1e6e42e54675f"' }>
                                            <li class="link">
                                                <a href="controllers/ProductsController.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProductsController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateOptionDataDto.html" data-type="entity-link">CreateOptionDataDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateOptionDto.html" data-type="entity-link">CreateOptionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateOptionParamsDto.html" data-type="entity-link">CreateOptionParamsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProductDto.html" data-type="entity-link">CreateProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteOptionFilterDto.html" data-type="entity-link">DeleteOptionFilterDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteOptionParamsDto.html" data-type="entity-link">DeleteOptionParamsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetOptionDto.html" data-type="entity-link">GetOptionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetOptionFilterDto.html" data-type="entity-link">GetOptionFilterDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetOptionsDto.html" data-type="entity-link">GetOptionsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetProductsDto.html" data-type="entity-link">GetProductsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/OptionsService.html" data-type="entity-link">OptionsService</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductsService.html" data-type="entity-link">ProductsService</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateOptionDataDto.html" data-type="entity-link">UpdateOptionDataDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateOptionFilterDto.html" data-type="entity-link">UpdateOptionFilterDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateOptionParamsDto.html" data-type="entity-link">UpdateOptionParamsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProductDto.html" data-type="entity-link">UpdateProductDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link">AppService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Option.html" data-type="entity-link">Option</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Product.html" data-type="entity-link">Product</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});