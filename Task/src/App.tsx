
import './App.css'
import {useTranslation} from 'react-i18next';
import i18n from 'i18next';
function App() {
  const {t} = useTranslation();
  const isRtl = i18n.language === 'ar'; 
  const changeLanguage = (language: string)=>{
    i18n.changeLanguage(language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }
  return (
    <main>
    <button className="langChangeBtn" onClick={()=> changeLanguage(isRtl ? 'en':'ar')}>{isRtl ? 'EN':'AR'}</button>
      <form action="submit" id="form">
        <div id="inputContainer">
          <div>
            <h1 id="formHeading">{t('heading')}</h1>
            <p id="formSubHeading">{t('subHeading')}</p>
          </div>
          <div>
          <label htmlFor="loginNumber" className="inputLabels">{t('loginPhone')}</label>
          <p className='labelSublement'><b> (preferably the <u>student's</u>)</b></p>
          </div>
          <input type="number" name="loginPhone" className="numberInput formInput" />
          <div>
          <label htmlFor="contactNumber" className="inputLabels">{t('contactPhone')}</label>
          <p className='labelSublement'><b> (preferably the <u>parent's</u>)</b></p>
          </div>
          <input type="number" name="contactNumber" className="numberInput formInput" />
          <div>
          <label htmlFor="email" className="inputLabels">{t('contactEmail')}</label>
          <p className='labelSublement'><b> (preferably the <u>parent's</u>)</b></p>
          </div>
          <input type="email" name="email" className="textInput formInput" />
          <label htmlFor="contactName" className="inputLabels">{t('contactName')}</label>
          <input type="text" name="contactName" className="textInput formInput"  />
          <label htmlFor="billingAdress" className="inputLabels">{t('billingAdress')}</label>
          <input type="text" name="Adress" className="adressInput formInput" placeholder={isRtl ? 'العنوان':'Address'} />
          <input type="text" name="AdressX" className="adressInput formInput" placeholder={isRtl ? 'مم':'Nr'} />
          <input type="text" name="postalCode" className="adressInput formInput" placeholder={isRtl ? 'الرمز البريدي':'Postal Code'} />
          <input type="text" name="city" className="adressInput formInput" placeholder={isRtl ? 'المدينة':'City'} />
          <input type="text" name="country" className="adressInput formInput" placeholder={isRtl ? 'البلد':'Country'} />
          <label htmlFor="monthlySessinos" className="inputLabels">{t('monthlySessions')}</label>
          <select name="monthlySessions" id="monthlySessions">
            <option value="1">{t('1')}</option>
          </select>
          <label htmlFor="paymentMethod" className="inputLabels">{t('paymentSelect')}</label>
          <input type="radio" name="sepa" className="paymentMethod formInput" />
          <input type="radio" name="card" className="paymentMethod formInput" />
          {/* <input type="radio" name="paypal" className="paymentMethod" /> */}
          <p>{t('securePayment')}</p>
        </div>
        <div id="infoContainer">
          <h3>{t('orderOverview')}</h3>
          <input type="radio" name="6months" className="paymentMethod" />
          <input type="radio" name="9months" className="paymentMethod" />
          <input type="radio" name="12months" className="paymentMethod" />
          <input type="radio" name="18months" className="paymentMethod" />
          <input type="radio" name="24months" className="paymentMethod" />
          <input type="radio" name="30months" className="paymentMethod" />
          <input type="button" value={t('advancePay')} />
          <p>{t('numberofsessions')}</p>
          <p>sessions value</p>
          <p>{t('regularPrice')}</p>
          <p>regular price</p>
          <p>{t('yourPrice')}</p>
          <p>sessions value</p>
          <p>{t('discount')}</p>
          <p>sessions value</p>
          <hr />
          <p>{t('setupFee')}</p>
          <p>value</p>
          <p>{t('total')}</p>
          <p>value</p>
          <input type="checkbox" name="terms" className="terms" />
          <label htmlFor="terms" id="terms">{isRtl ?"انا اوافق علي ":"I accept the"} <a href="#">{isRtl ? "الشروط والأحكام":"terms & conditions"}</a> 
          {isRtl ?"وأفهم":"and understand"} <a href="#">{isRtl ? "حقي في التراجع":"right of widthdrawal"}</a> 
          {isRtl ?"كذلك الظروف التي تؤدي للمثل":"as well as the cirumstances that lead to repeal of the same"}</label>
          <button type='submit'>{t('orderNow')}</button>
        </div>
      </form>
    </main>
  )
}

export default App
