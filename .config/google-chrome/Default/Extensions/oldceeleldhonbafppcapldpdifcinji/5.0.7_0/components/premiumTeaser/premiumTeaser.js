class PremiumTeaser{constructor(e,t,n=null,r=null,s=null,i){this._parentElement=e,this._headline=n,this._text=r,this._buttonText=s,this._trackingEvent=t,this._linkParameters=i,this._document=e.ownerDocument,this._storageController=StorageController.create(),this._element=this._document.createElement("lt-div"),this._element.addEventListener("click",(e=>{const t=Object.assign({command:"OPEN_PREMIUM_PAGE"},this._linkParameters);browser.runtime.sendMessage(t),e.preventDefault(),e.stopImmediatePropagation()}),!0),this._element.className="lt-premium-errors-teaser",this._parentElement.appendChild(this._element),this._renderPremiumErrorsTeaser()}_observe(){this._element.addEventListener("click",(()=>{Tracker.trackEvent("Action",`${this._trackingEvent}:click`)}))}_renderPremiumErrorsTeaser(){Tracker.trackEvent("Action",this._trackingEvent),this._observe(),this._storageController.onReady((()=>{this._storageController.startChangelogCoupon();const e=this._storageController.getActiveCoupon();if(e&&(this._linkParameters.campaign=this._linkParameters.campaign.replace(/addon2-(dialog|popup|validator)/,"addon2-changelog"),this._renderCoupon(e)),!this._headline&&!this._text&&!this._buttonText)return;const t=this._document.createElement("lt-div");if(t.className="lt-premium-errors-teaser__content",this._element.appendChild(t),this._headline&&!e){const e=this._document.createElement("lt-span");e.className="lt-premium-errors-teaser__content__headline",e.textContent=this._headline,t.appendChild(e)}if(this._text){const e=this._document.createElement("lt-span");e.className="lt-premium-errors-teaser__content__text",e.innerHTML=this._text,t.appendChild(e)}if(this._buttonText){const e=this._document.createElement("lt-span");e.className="lt-premium-errors-teaser__content__button",e.textContent=this._buttonText,t.appendChild(e)}}))}_renderCoupon(e){const t=this._document.createElement("lt-div");t.className="lt-premium-errors-teaser__coupon";const n=this._document.createElement("lt-span");n.textContent=i18nManager.getMessage("upgradeTeaserDiscountHeadline"),n.className="lt-premium-errors-teaser__coupon__title__headline";const r=this._document.createElement("lt-span");r.textContent=i18nManager.getMessage("upgradeTeaserDiscount",[e.percent]),r.className="lt-premium-errors-teaser__coupon__title__subline";const s=this._document.createElement("lt-div");s.className="lt-premium-errors-teaser__coupon__title",s.appendChild(n),s.appendChild(r),t.appendChild(s);const i=this._document.createElement("lt-div");i.className="lt-premium-errors-teaser__coupon__timer",t.appendChild(i),this._element.prepend(t),window.clearInterval(this._interval),this._renderTimer(t,i,e),this._interval=window.setInterval((()=>this._renderTimer(t,i,e)),1e3)}_renderTimer(e,t,n){const r=Date.now();let s=(n.expires||0)-r;if(s<0)return s=0,void e.remove();const i=Math.floor(s/1e3%60),a=Math.floor(s/1e3/60%60),o=Math.floor(s/1e3/60/60),l=`${pad(o)}:${pad(a)}:${pad(i)}`.split(/:|/),_=this._document.createElement("lt-div");l.forEach(((e,t)=>{const n=this._document.createElement("lt-span");if(n.className="lt-premium-timer__timer__diget",n.textContent=e,_.appendChild(n),t%2==1&&t<l.length-1){const e=this._document.createElement("lt-span");e.className="lt-premium-timer__timer__divider",e.textContent=":",_.appendChild(e)}})),t.innerHTML=_.innerHTML}destroy(){window.clearInterval(this._interval)}}