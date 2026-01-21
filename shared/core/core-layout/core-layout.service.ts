import { mockInitialElements } from './../../mocks/initial-elements-mock';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable, Inject, Optional } from '@angular/core';
import { sharedEnvironment } from '../../environments/environment.shared';
import { Observable, tap } from 'rxjs';
import { ObservableUtils } from '../utils/ObservablesUtils';


@Injectable({
  providedIn: 'root',
})
export class CoreLayoutService {
  optionsMenu: any[] = [];

  initialElements: any = { preloader: '', favicon: '' };
  versionJs!: any;
  versionCss!: any;
  public preloaderImage = '';
  public staticContentUrl = sharedEnvironment.STATIC_CONTENT;
  applyMock = true;

  constructor(private http: HttpClient) {}

  initPartnerSetup() {
    return new Promise<void>((resolve, reject) => {
      let domain = 'julio';
      this.getInitialElements(domain)
        .pipe(
          tap((data: any) => this.processInitialElementsInfo(data, domain)),
          tap(() => resolve())
        )
        .subscribe();
    });
  }

  getInitialElements(domain: string) {
    if(this.applyMock){ return ObservableUtils.createMockObservable(mockInitialElements); }
    let params = new HttpParams();
    params = params.set('subdomain', domain);
    params = params.set('lan', 'es-ES');
    return this.http.get<any>(sharedEnvironment.apiEndpoint + 'api/partner/initialelements', { params });
  }

  async processInitialElementsInfo(result: any, domain: string) {
    if (result) {
      //console.log({ result });
      this.initialElements = result;
      this.versionJs = this.initialElements.jsVersion;
      this.versionCss = this.initialElements.cssVersion;
      this.initialElements.staticContent = sharedEnvironment.STATIC_CONTENT;
      this.initialElements.fonts = result.fonts ? JSON.parse(`${result.fonts}`) : null;
      this.initialElements.colors = result.colors ? JSON.parse(`${result.colors}`) : null;
      const primary = result?.buttons?.primary ? JSON.parse(`${result.buttons.primary}`) : null;
      const secondary = result?.buttons?.secondary ? JSON.parse(`${result.buttons.secondary}`) : null;

      this.initialElements.buttons = {
        primary,
        secondary,
      };

      if (this.initialElements.preloader) {
        this.preloaderImage = this.initialElements.preloader;
        let preloader = document.getElementById('initialPreloader');
        if (preloader) {
          preloader.setAttribute('src', this.preloaderImage);
          preloader.style.visibility = 'visible';
        }
      }
      // default
      else {
        this.initialElements.preloader = `${this.staticContentUrl}img/brand/preloader.gif`;
      }

      if (result.favicon) {
        document.getElementById('favicon')?.setAttribute('href', this.initialElements.favicon);
      }

      const storageElements = {
        staticContent: this.initialElements.staticContent,
        versionCss: this.versionCss,
        fonts: {
          primaryRegularFont: {
            url: this.initialElements.fonts?.UrlFontPrimaryRegular ? this.initialElements.fonts.UrlFontPrimaryRegular : null,
            name: this.initialElements.fonts.UrlFontPrimaryRegularName,
          },
          primaryBoldFont: {
            url: this.initialElements.fonts.UrlFontPrimaryBold,
            name: this.initialElements.fonts.UrlFontPrimaryBoldName,
          },
          secondaryRegularFont: {
            url: this.initialElements.fonts.UrlFontSecondaryRegular,
            name: this.initialElements.fonts.UrlFontSecondaryRegularName,
          },
          secondaryBoldFont: {
            url: this.initialElements.fonts.UrlFontSecondaryBold,
            name: this.initialElements.fonts.UrlFontSecondaryBoldName,
          },
        },
        colors: {
          primary: this.initialElements.colors.ColorPrimary,
          primaryHover: this.initialElements.colors.ColorPrimaryHover,
          primaryDisabled: this.initialElements.colors.ColorPrimaryDisabled,
          secondary: this.initialElements.colors.ColorSecondary,
          secondaryHover: this.initialElements.colors.ColorSecondaryHover,
          secondaryDisabled: this.initialElements.colors.ColorSecondaryDisabled,
          accent: this.initialElements.colors.ColorAccent,
          accentHover: this.initialElements.colors.ColorAccentHover,
          accentDisabled: this.initialElements.colors.ColorAccentDisabled,
        },
        buttons: {
          primary: {
            base: {
              borderRadius: this.initialElements.buttons.primary.Base.BorderRadius + 'px',
              textTransform: this.initialElements.buttons.primary.Base.TextTransform,
              backgroundColor: this.initialElements.buttons.primary.Base.BackgroundColor,
              color: this.initialElements.buttons.primary.Base.TextColor,
              borderColor: this.initialElements.buttons.primary.Base.BorderColor,
              boderWidth: this.initialElements.buttons.primary.Base.BorderWidth + 'px',
              borderStyle: 'solid',
            },
            hover: {
              borderRadius: this.initialElements.buttons.primary.Hover.BorderRadius + 'px',
              textTransform: this.initialElements.buttons.primary.Hover.TextTransform,
              backgroundColor: this.initialElements.buttons.primary.Hover.BackgroundColor,
              color: this.initialElements.buttons.primary.Hover.TextColor,
              borderColor: this.initialElements.buttons.primary.Hover.BorderColor,
              boderWidth: this.initialElements.buttons.primary.Hover.BorderWidth + 'px',
              borderStyle: 'solid',
            },
            disabled: {
              borderRadius: this.initialElements.buttons.primary.Disabled.BorderRadius + 'px',
              textTransform: this.initialElements.buttons.primary.Disabled.TextTransform,
              backgroundColor: this.initialElements.buttons.primary.Disabled.BackgroundColor,
              color: this.initialElements.buttons.primary.Disabled.TextColor,
              borderColor: this.initialElements.buttons.primary.Disabled.BorderColor,
              boderWidth: this.initialElements.buttons.primary.Disabled.BorderWidth + 'px',
              borderStyle: 'solid',
            },
            focus: {
              borderRadius: this.initialElements.buttons.primary.Focus.BorderRadius + 'px',
              textTransform: this.initialElements.buttons.primary.Focus.TextTransform,
              backgroundColor: this.initialElements.buttons.primary.Focus.BackgroundColor,
              color: this.initialElements.buttons.primary.Focus.TextColor,
              borderColor: this.initialElements.buttons.primary.Focus.BorderColor,
              boderWidth: this.initialElements.buttons.primary.Focus.BorderWidth + 'px',
              borderStyle: 'solid',
            },
          },
          secondary: {
            base: {
              borderRadius: this.initialElements.buttons.secondary.Base.BorderRadius + 'px',
              textTransform: this.initialElements.buttons.secondary.Base.TextTransform,
              backgroundColor: this.initialElements.buttons.secondary.Base.BackgroundColor,
              color: this.initialElements.buttons.secondary.Base.TextColor,
              borderColor: this.initialElements.buttons.secondary.Base.BorderColor,
              boderWidth: this.initialElements.buttons.secondary.Base.BorderWidth + 'px',
              borderStyle: 'solid',
            },
            hover: {
              borderRadius: this.initialElements.buttons.secondary.Hover.BorderRadius + 'px',
              textTransform: this.initialElements.buttons.secondary.Hover.TextTransform,
              backgroundColor: this.initialElements.buttons.secondary.Hover.BackgroundColor,
              color: this.initialElements.buttons.secondary.Hover.TextColor,
              borderColor: this.initialElements.buttons.secondary.Hover.BorderColor,
              boderWidth: this.initialElements.buttons.secondary.Hover.BorderWidth + 'px',
              borderStyle: 'solid',
            },
            disabled: {
              borderRadius: this.initialElements.buttons.secondary.Disabled.BorderRadius + 'px',
              textTransform: this.initialElements.buttons.secondary.Disabled.TextTransform,
              backgroundColor: this.initialElements.buttons.secondary.Disabled.BackgroundColor,
              color: this.initialElements.buttons.secondary.Disabled.TextColor,
              borderColor: this.initialElements.buttons.secondary.Disabled.BorderColor,
              boderWidth: this.initialElements.buttons.secondary.Disabled.BorderWidth + 'px',
              borderStyle: 'solid',
            },
            focus: {
              borderRadius: this.initialElements.buttons.secondary.Focus.BorderRadius + 'px',
              textTransform: this.initialElements.buttons.secondary.Focus.TextTransform,
              backgroundColor: this.initialElements.buttons.secondary.Focus.BackgroundColor,
              color: this.initialElements.buttons.secondary.Focus.TextColor,
              borderColor: this.initialElements.buttons.secondary.Focus.BorderColor,
              boderWidth: this.initialElements.buttons.secondary.Focus.BorderWidth + 'px',
              borderStyle: 'solid',
            },
          },
        },
      };

      console.log({ storageElements });

      if (this.initialElements) {
        // localStorage.setItem('initialElements', JSON.stringify(storageElements));
        this.setIcons(storageElements.versionCss, storageElements.staticContent);
        this.setColors(storageElements.colors);
        this.setButtons(storageElements.buttons);
        this.setFonts(storageElements.fonts);
      }

      if (result.pwaName && result.pwaIconPath && result.pwaStatusBarColor && result.pwaMobileIconPath && !domain.includes('localhost')) {
        // Has pwa configuration -> registering sw and pwa configuration
        this.loadPwaManifest();
      }
      await this.loadScript('js/popper.min.js', 'popperJs', null, 'anonymous');
      await this.loadScript('js/startchat.js', 'startchat', null, 'anonymous');
      await this.loadCss('css/styles.css', 'styles', 'stylesheet');

      document.documentElement.style.setProperty('--strong-font-family', this.initialElements['fonts']['UrlFontSecondaryBoldName'], 'important');
      document.documentElement.style.setProperty('--button-font-family', this.initialElements['fonts']['UrlFontSecondaryBoldName'], 'important');
    }
    // default
    else {
      this.initialElements.preloader = `${this.staticContentUrl}img/brand/preloader.gif`;
    }

    if (result && result.favicon && this.initialElements && this.initialElements.favicon) {
      document.getElementById('favicon')?.setAttribute('href', this.initialElements.favicon);
    }
    if (this.initialElements.loginType == 1) {
    }
  }

  public async loadScript(url: string, id: any, integrity?: any, crossOrigin?: any, type?: string) {
    var script = document.createElement('script');
    script.src = `${sharedEnvironment.STATIC_CONTENT}${url}?v=${this.versionJs}`;
    script.id = id;
    type ? (script.type = type) : null;
    integrity ? (script.integrity = integrity) : null;
    crossOrigin ? (script.crossOrigin = crossOrigin) : null;
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  public async loadCss(url: string, id: any, rel: any, crossOrigin?: any) {
    var stylesUrl = `${sharedEnvironment.STATIC_CONTENT}${url}?v=${this.versionCss}`;
    var link = document.createElement('link');
    crossOrigin ? (link.crossOrigin = crossOrigin) : null;
    link.id = id;
    link.rel = rel;
    link.href = stylesUrl;
    link.type = 'text/css';
    document.getElementsByTagName('head')[0].appendChild(link);
  }

  private setColors(colors: any) {
    document.documentElement.style.setProperty('--primary', colors?.primary ?? '#36B3ED', 'important');
    document.documentElement.style.setProperty('--primary-hover', colors?.primaryHover ?? '#2A8BB8', 'important');
    document.documentElement.style.setProperty('--primary-disabled', colors?.primaryDisabled ?? '#A6D6ED', 'important');
    document.documentElement.style.setProperty('--secondary', colors?.secondary ?? '#666a73', 'important');
    document.documentElement.style.setProperty('--secondary-hover', colors?.secondaryHover ?? '#34383F', 'important');
    document.documentElement.style.setProperty('--secondary-disabled', colors?.secondaryDisabled ?? '#BCC4D4', 'important');
    document.documentElement.style.setProperty('--accent', colors?.accent ?? '#0349FE', 'important');
    document.documentElement.style.setProperty('--accent-hover', colors?.accentHover ?? '#012D9D', 'important');
    document.documentElement.style.setProperty('--accent-disabled', colors?.accentDisabled ?? '#7BA0FE', 'important');
    document.documentElement.style.setProperty('--neutral-bg', colors?.neutralBg ?? '#ECF1F8', 'important');
    document.documentElement.style.setProperty('--neutral-black', colors?.neutralBlack ?? '#34383f', 'important');
    document.documentElement.style.setProperty('--neutral-white', colors?.neutralWhite ?? '#FFFFFF', 'important');
    document.documentElement.style.setProperty('--semantics-danger', colors?.semanticsDanger ?? '#D60000', 'important');
    document.documentElement.style.setProperty('--semantics-warning', colors?.semanticsWarning ?? '#FFC507', 'important');
    document.documentElement.style.setProperty('--semantics-success', colors?.semanticsSuccess ?? '#007922', 'important');
    document.documentElement.style.setProperty('--semantics-info', colors?.semanticsInfo ?? '#0349fe', 'important');
    document.documentElement.style.setProperty('--semantics-orange', colors?.semanticsOrange ?? '#FF981F', 'important');
    document.documentElement.style.setProperty('--semantics-pink', colors?.semanticsPink ?? '#FD96FF', 'important');
    document.documentElement.style.setProperty('--semantics-danger-light', colors?.semanticsDanger ?? '#FFD9D9', 'important');
    document.documentElement.style.setProperty('--semantics-warning-light', colors?.semanticsWarning ?? '#FFF5D6', 'important');
    document.documentElement.style.setProperty('--semantics-success-light', colors?.semanticsSuccess ?? '#D7FAE1', 'important');
    document.documentElement.style.setProperty('--semantics-info-light', colors?.semanticsInfo ?? '#D3DFFE', 'important');
    document.documentElement.style.setProperty('--semantics-orange-light', colors?.semanticsOrange ?? '#FFE4C4', 'important');
    document.documentElement.style.setProperty('--semantics-pink-light', colors?.semanticsPink ?? '#FED9FF', 'important');
  }

  private setButtons(buttons: any) {
    document.documentElement.style.setProperty('--btn-primary-border-radius', buttons?.primary?.base?.borderRadius ?? '8px', 'important');
    document.documentElement.style.setProperty('--btn-primary-text-transform', buttons?.primary?.base?.textTransform ?? 'uppercase', 'important');
    document.documentElement.style.setProperty('--btn-primary-padding', buttons?.primary?.base?.padding ?? '12px 16px', 'important');
    document.documentElement.style.setProperty('--btn-primary-line-height', buttons?.primary?.base?.lineHeight ?? '16.41px', 'important');
    document.documentElement.style.setProperty('--btn-primary-background-color', buttons?.primary?.base?.backgroundColor ?? 'var(--primary)', 'important');
    document.documentElement.style.setProperty('--btn-primary-color', buttons?.primary?.base?.color ?? '#FFF', 'important');
    document.documentElement.style.setProperty('--btn-primary-border-color', buttons?.primary?.base?.borderColor ?? 'none', 'important');
    document.documentElement.style.setProperty('--btn-primary-border-width', buttons?.primary?.base?.boderWidth ?? '0', 'important');
    document.documentElement.style.setProperty('--btn-primary-border-style', buttons?.primary?.base?.borderStyle ?? 'none', 'important');
    document.documentElement.style.setProperty('--btn-primary-opacity', buttons?.primary?.base?.opacity ?? '1', 'important');

    document.documentElement.style.setProperty('--btn-primary-hover-border-radius', buttons?.primary?.hover?.borderRadius ?? '8px', 'important');
    document.documentElement.style.setProperty('--btn-primary-hover-text-transform', buttons?.primary?.hover?.textTransform ?? 'uppercase', 'important');
    document.documentElement.style.setProperty('--btn-primary-hover-padding', buttons?.primary?.hover?.padding ?? '12px 16px', 'important');
    document.documentElement.style.setProperty('--btn-primary-hover-line-height', buttons?.primary?.hover?.lineHeight ?? '16.41px', 'important');
    document.documentElement.style.setProperty('--btn-primary-hover-background-color', buttons?.primary?.hover?.backgroundColor ?? 'var(--primary-hover)', 'important');
    document.documentElement.style.setProperty('--btn-primary-hover-color', buttons?.primary?.hover?.color ?? '#FFF', 'important');
    document.documentElement.style.setProperty('--btn-primary-hover-border-color', buttons?.primary?.hover?.borderColor ?? 'none', 'important');
    document.documentElement.style.setProperty('--btn-primary-hover-border-width', buttons?.primary?.hover?.boderWidth ?? '0', 'important');
    document.documentElement.style.setProperty('--btn-primary-hover-border-style', buttons?.primary?.hover?.borderStyle ?? 'none', 'important');
    document.documentElement.style.setProperty('--btn-primary-hover-opacity', buttons?.primary?.hover?.opacity ?? '1', 'important');

    document.documentElement.style.setProperty('--btn-primary-disabled-border-radius', buttons?.primary?.disabled?.borderRadius ?? '8px', 'important');
    document.documentElement.style.setProperty('--btn-primary-disabled-text-transform', buttons?.primary?.disabled?.textTransform ?? 'uppercase', 'important');
    document.documentElement.style.setProperty('--btn-primary-disabled-padding', buttons?.primary?.disabled?.padding ?? '12px 16px', 'important');
    document.documentElement.style.setProperty('--btn-primary-disabled-line-height', buttons?.primary?.disabled?.lineHeight ?? '16.41px', 'important');
    document.documentElement.style.setProperty('--btn-primary-disabled-background-color', buttons?.primary?.disabled?.backgroundColor ?? 'var(--primary-disabled)', 'important');
    document.documentElement.style.setProperty('--btn-primary-disabled-color', buttons?.primary?.disabled?.color ?? '#FFF', 'important');
    document.documentElement.style.setProperty('--btn-primary-disabled-border-color', buttons?.primary?.disabled?.borderColor ?? 'none', 'important');
    document.documentElement.style.setProperty('--btn-primary-disabled-border-width', buttons?.primary?.disabled?.boderWidth ?? '0', 'important');
    document.documentElement.style.setProperty('--btn-primary-disabled-border-style', buttons?.primary?.disabled?.borderStyle ?? 'none', 'important');
    document.documentElement.style.setProperty('--btn-primary-disabled-opacity', buttons?.primary?.disabled?.opacity ?? '0.3', 'important');

    document.documentElement.style.setProperty('--btn-primary-focus-border-radius', buttons?.primary?.focus?.borderRadius ?? '8px', 'important');
    document.documentElement.style.setProperty('--btn-primary-focus-text-transform', buttons?.primary?.focus?.textTransform ?? 'uppercase', 'important');
    document.documentElement.style.setProperty('--btn-primary-focus-padding', buttons?.primary?.focus?.padding ?? '12px 16px', 'important');
    document.documentElement.style.setProperty('--btn-primary-focus-line-height', buttons?.primary?.focus?.lineHeight ?? '16.41px', 'important');
    document.documentElement.style.setProperty('--btn-primary-focus-background-color', buttons?.primary?.focus?.backgroundColor ?? 'var(--primary)', 'important');
    document.documentElement.style.setProperty('--btn-primary-focus-color', buttons?.primary?.focus?.color ?? '#FFF', 'important');
    document.documentElement.style.setProperty('--btn-primary-focus-border-color', buttons?.primary?.focus?.borderColor ?? 'var(--accent)', 'important');
    document.documentElement.style.setProperty('--btn-primary-focus-border-width', buttons?.primary?.focus?.boderWidth ?? '2px', 'important');
    document.documentElement.style.setProperty('--btn-primary-focus-border-style', buttons?.primary?.focus?.borderStyle ?? 'solid', 'important');
    document.documentElement.style.setProperty('--btn-primary-focus-opacity', buttons?.primary?.focus?.opacity ?? '1', 'important');

    document.documentElement.style.setProperty('--btn-secondary-border-radius', buttons?.secondary?.base?.borderRadius ?? '8px', 'important');
    document.documentElement.style.setProperty('--btn-secondary-text-transform', buttons?.secondary?.base?.textTransform ?? 'uppercase', 'important');
    document.documentElement.style.setProperty('--btn-secondary-padding', buttons?.secondary?.base?.padding ?? '12px 16px', 'important');
    document.documentElement.style.setProperty('--btn-secondary-line-height', buttons?.secondary?.base?.lineHeight ?? '16.41px', 'important');
    document.documentElement.style.setProperty('--btn-secondary-background-color', buttons?.secondary?.base?.backgroundColor ?? 'transparent', 'important');
    document.documentElement.style.setProperty('--btn-secondary-color', buttons?.secondary?.base?.color ?? 'var(--secondary)', 'important');
    document.documentElement.style.setProperty('--btn-secondary-border-color', buttons?.secondary?.base?.borderColor ?? 'var(--secondary)', 'important');
    document.documentElement.style.setProperty('--btn-secondary-border-width', buttons?.secondary?.base?.boderWidth ?? '2px', 'important');
    document.documentElement.style.setProperty('--btn-secondary-border-style', buttons?.secondary?.base?.borderStyle ?? 'solid', 'important');
    document.documentElement.style.setProperty('--btn-secondary-opacity', buttons?.secondary?.base?.opacity ?? '1', 'important');

    document.documentElement.style.setProperty('--btn-secondary-hover-border-radius', buttons?.secondary?.hover?.borderRadius ?? '8px', 'important');
    document.documentElement.style.setProperty('--btn-secondary-hover-text-transform', buttons?.secondary?.hover?.textTransform ?? 'uppercase', 'important');
    document.documentElement.style.setProperty('--btn-secondary-hover-padding', buttons?.secondary?.hover?.padding ?? '12px 16px', 'important');
    document.documentElement.style.setProperty('--btn-secondary-hover-line-height', buttons?.secondary?.hover?.lineHeight ?? '16.41px', 'important');
    document.documentElement.style.setProperty('--btn-secondary-hover-background-color', buttons?.secondary?.hover?.backgroundColor ?? 'var(--secondary)', 'important');
    document.documentElement.style.setProperty('--btn-secondary-hover-color', buttons?.secondary?.hover?.color ?? '#FFF', 'important');
    document.documentElement.style.setProperty('--btn-secondary-hover-border-color', buttons?.secondary?.hover?.borderColor ?? 'var(--secondary)', 'important');
    document.documentElement.style.setProperty('--btn-secondary-hover-border-width', buttons?.secondary?.hover?.boderWidth ?? '2px', 'important');
    document.documentElement.style.setProperty('--btn-secondary-hover-border-style', buttons?.secondary?.hover?.borderStyle ?? 'solid', 'important');
    document.documentElement.style.setProperty('--btn-secondary-hover-opacity', buttons?.secondary?.hover?.opacity ?? '1', 'important');

    document.documentElement.style.setProperty('--btn-secondary-disabled-border-radius', buttons?.secondary?.disabled?.borderRadius ?? '8px', 'important');
    document.documentElement.style.setProperty('--btn-secondary-disabled-text-transform', buttons?.secondary?.disabled?.textTransform ?? 'uppercase', 'important');
    document.documentElement.style.setProperty('--btn-secondary-disabled-padding', buttons?.secondary?.disabled?.padding ?? '12px 16px', 'important');
    document.documentElement.style.setProperty('--btn-secondary-disabled-line-height', buttons?.secondary?.disabled?.lineHeight ?? '16.41px', 'important');
    document.documentElement.style.setProperty('--btn-secondary-disabled-background-color', buttons?.secondary?.disabled?.backgroundColor ?? 'transparent', 'important');
    document.documentElement.style.setProperty('--btn-secondary-disabled-color', buttons?.secondary?.disabled?.color ?? 'var(--secondary)', 'important');
    document.documentElement.style.setProperty('--btn-secondary-disabled-border-color', buttons?.secondary?.disabled?.borderColor ?? 'var(--secondary)', 'important');
    document.documentElement.style.setProperty('--btn-secondary-disabled-border-width', buttons?.secondary?.disabled?.boderWidth ?? '2px', 'important');
    document.documentElement.style.setProperty('--btn-secondary-disabled-border-style', buttons?.secondary?.disabled?.borderStyle ?? 'solid', 'important');
    document.documentElement.style.setProperty('--btn-secondary-disabled-opacity', buttons?.secondary?.disabled?.opacity ?? '0.3', 'important');

    document.documentElement.style.setProperty('--btn-secondary-focus-border-radius', buttons?.secondary?.focus?.borderRadius ?? '8px', 'important');
    document.documentElement.style.setProperty('--btn-secondary-focus-text-transform', buttons?.secondary?.focus?.textTransform ?? 'uppercase', 'important');
    document.documentElement.style.setProperty('--btn-secondary-focus-padding', buttons?.secondary?.focus?.padding ?? '12px 16px', 'important');
    document.documentElement.style.setProperty('--btn-secondary-focus-line-height', buttons?.secondary?.focus?.lineHeight ?? '16.41px', 'important');
    document.documentElement.style.setProperty('--btn-secondary-focus-background-color', buttons?.secondary?.focus?.backgroundColor ?? 'transparent', 'important');
    document.documentElement.style.setProperty('--btn-secondary-focus-color', buttons?.secondary?.focus?.color ?? 'var(--secondary)', 'important');
    document.documentElement.style.setProperty('--btn-secondary-focus-border-color', buttons?.secondary?.focus?.borderColor ?? 'var(--accent)', 'important');
    document.documentElement.style.setProperty('--btn-secondary-focus-border-width', buttons?.secondary?.focus?.boderWidth ?? '2px', 'important');
    document.documentElement.style.setProperty('--btn-secondary-focus-border-style', buttons?.secondary?.focus?.borderStyle ?? 'solid', 'important');
    document.documentElement.style.setProperty('--btn-secondary-focus-opacity', buttons?.secondary?.focus?.opacity ?? '1', 'important');
  }

  private setIcons(versionCss: any, staticContent: any) {
    const isMyIcons = document.getElementById('myIcons');
    const isNewCore = document.getElementById('newCore');

    if (!isMyIcons) {
      let stylesUrl = `${staticContent ? staticContent : 'https://devstatic.app.onlineassist.me/suite/'}fonts/myicons/myicons.css?v=${versionCss ? versionCss : '4.7.10'}`;
      let link = document.createElement('link');
      link.id = 'myIcons';
      link.rel = 'stylesheet';
      link.href = stylesUrl;
      link.type = 'text/css';
      document.getElementsByTagName('head')[0].appendChild(link);
    }

    if (!isNewCore) {
      let stylesUrl2 = `${staticContent ? staticContent : 'https://devstatic.app.onlineassist.me/suite/'}fonts/newcore/newcore.css?v=${versionCss ? versionCss : '4.7.10'}`;
      let link2 = document.createElement('link');
      link2.id = 'newCore';
      link2.rel = 'stylesheet';
      link2.href = stylesUrl2;
      link2.type = 'text/css';
      document.getElementsByTagName('head')[0].appendChild(link2);
    }
  }

  private setFonts(fonts: any) {
    const primaryRegularFontName = fonts && fonts.primaryRegularFont && fonts.primaryRegularFont.name ? fonts.primaryRegularFont.name : 'MontserratRegular';
    const primaryRegularFontUrl =
      fonts && fonts.primaryRegularFont && fonts.primaryRegularFont.url ? fonts.primaryRegularFont.url : 'https://devstatic.app.onlineassist.me/suite/fonts/montserrat/MontserratRegular.woff';
    const primaryBoldFontName = fonts && fonts.primaryBoldFont && fonts.primaryBoldFont.name ? fonts.primaryBoldFont.name : 'MontserratBold';
    const primaryBoldFontUrl =
      fonts && fonts.primaryBoldFont && fonts.primaryBoldFont.url ? fonts.primaryBoldFont.url : 'https://devstatic.app.onlineassist.me/suite/fonts/montserrat/MontserratBold.woff';
    const secondaryRegularFontName = fonts && fonts.secondaryRegularFont && fonts.secondaryRegularFont.name ? fonts.secondaryRegularFont.name : 'RobotoRegular';
    const secondaryRegularFontUrl =
      fonts && fonts.secondaryRegularFont && fonts.secondaryRegularFont.url ? fonts.secondaryRegularFont.url : 'https://devstatic.app.onlineassist.me/suite/fonts/roboto/Roboto-Regular.woff';
    const secondaryBoldFontName = fonts && fonts.secondaryBoldFont && fonts.secondaryBoldFont.name ? fonts.secondaryBoldFont.name : 'RobotoBold';
    const secondaryBoldFontUrl =
      fonts && fonts.secondaryBoldFont && fonts.secondaryBoldFont.url ? fonts.secondaryBoldFont.url : 'https://devstatic.app.onlineassist.me/suite/fonts/roboto/Roboto-Bold.woff';

    //let sheet = window.document.styleSheets[0];

    const styleSheets = Array.from(document.styleSheets).filter((styleSheet) => !styleSheet.href || styleSheet.href.startsWith(window.location.origin));

    for (let style of styleSheets) {
      if (style instanceof CSSStyleSheet && style.cssRules) {
        style.insertRule(
          `
          @font-face {
            font-family: '${primaryRegularFontName}';
            src: url(${primaryRegularFontUrl});
            font-style: normal;
            font-weight: normal;
          }`
        );

        style.insertRule(
          `
          @font-face {
            font-family: '${primaryBoldFontName}';
            src: url(${primaryBoldFontUrl});
            font-style: normal;
            font-weight: normal;
          }`
        );

        style.insertRule(
          `
          @font-face {
            font-family: '${secondaryRegularFontName}';
            src: url(${secondaryRegularFontUrl});
            font-style: normal;
            font-weight: normal;
          }`
        );

        style.insertRule(
          `
          @font-face {
            font-family: '${secondaryBoldFontName}';
            src: url(${secondaryBoldFontUrl});
            font-style: normal;
            font-weight: normal;
          }`
        );
      }
    }

    document.documentElement.style.setProperty('--font-family-primary-regular', primaryRegularFontName, 'important');
    document.documentElement.style.setProperty('--font-family-primary-bold', primaryBoldFontName, 'important');
    document.documentElement.style.setProperty('--font-family-secondary-regular', secondaryRegularFontName, 'important');
    document.documentElement.style.setProperty('--font-family-secondary-bold', secondaryBoldFontName, 'important');

    let fraBtnFonts: any = document.getElementsByClassName('fra-btn-font');
    for (let i = 0; i < fraBtnFonts.length; i++) {
      fraBtnFonts[i].style['font-family'] = `${secondaryBoldFontName}, san serif`;
    }
  }

  private loadPwaManifest() {
    // PWA manifest loading logic
    console.log('Loading PWA manifest...');
    // This method can be implemented when PWA functionality is needed
  }

}
