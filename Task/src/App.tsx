import './App.css';
import './assets/inputStyling.css';
import Switch from './components/switch';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import i18n from 'i18next';
function App() {
  //importing translations and locale 
  const {t} = useTranslation();
  const isRtl = i18n.language === 'ar'; 

  //state managment
  const [selectedPayment, setSelectedPayment] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedSessionNumber, setSelectedSessionNumber] = useState<number>(0);
  const [advancePayEnabled, setAdvancePayEnabled] = useState(false);

  //event handlers
  const changeLanguage = (language: string)=>{
    i18n.changeLanguage(language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }

  const handlePaymentChange = (method: string) => {
    setSelectedPayment(method);
  };

  const handleMonthChange = (month:string) => {
    setSelectedMonth(month);
  };

  const handleSwitchChange = (isOn: boolean) => {
    setAdvancePayEnabled(isOn);
  };

  const handleSessionNumberChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = parseInt(e.target.value, 10);
      setSelectedSessionNumber(value);
  };

  //data
  const countries = [
    { code: 'DE', name: isRtl ? 'ألمانيا' : 'Germany' },
    { code: 'FR', name: isRtl ? 'فرنسا' : 'France' },
    { code: 'UK', name: isRtl ? 'المملكة المتحدة' : 'United Kingdom' },
    { code: 'NL', name: isRtl ? 'هولندا' : 'Netherlands' }
  ];

  const sessionsNumber = [
    { value: 2, label: isRtl ?'جلستين':'2 sessions' },
    { value: 4, label: isRtl ?'أربع جلسات':'4 sessions' },
    { value: 6, label: isRtl ?'ست جلسات':'6 sessions' },
    { value: 8, label: isRtl ?'ثماني جلسات':'8 sessions' },
    { value: 10, label: isRtl ?'عشر جلسات':'10 sessions' },
    { value: 12, label: isRtl ?'إثنا عشر جلسة':'12 sessions' },
  ];

  
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
          <label htmlFor="billingAdress" className="inputLabels">{t('billingAddress')}</label>
          <div id="billingAdressContainer">
            <div id="billingAdressRow1">
              <input type="text" name="Adress" id="adress" className="adressInput" placeholder={isRtl ? 'العنوان':'Address'} />
              <input type="text" name="AdressX" id="adressX " className="adressInput" placeholder={isRtl ? 'مم':'Nr'} />
            </div>
            <div id="billingAdressRow2">
              <input type="text" name="postalCode" className="adressInput" placeholder={isRtl ? 'الرمز البريدي':'Postal Code'} />
              <input type="text" name="city" className="adressInput" placeholder={isRtl ? 'المدينة':'City'} />
              <select 
                name="country" 
                className="adressInput"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  {isRtl ? 'اختر البلد' : 'Select Country'}
                </option>
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <label htmlFor="monthlySessinos" className="inputLabels">{t('monthlySessions')}</label>
          <select name="monthlySessions" id="monthlySessions" onChange={(e)=>handleSessionNumberChange(e)} >
                <option value="" disabled>
                  {isRtl ? 'عدد الجلسات' : 'No. of Sessions'}
                </option>
                {sessionsNumber.map((session)=>(
                  <option key={session.value} value={session.label}>
                    {session.label}
                  </option>
                ))}
          </select>
          <div >
            <label className="inputLabels">{t('paymentSelect')}</label>
            <div>
              <div className="methodContainer" onClick={() => handlePaymentChange('sepa')}>
                  <div>
                    <input type="radio" name="payment" className='methodRadio' checked={selectedPayment === 'sepa'} onChange={() => {}}  />
                    <img src="./sepa.png" alt="sepa logo" width="50px" />
                  </div>
                  {selectedPayment === 'sepa' && (
                    <div id="methodsInputContainer">
                      <input type="text" placeholder="IBAN" className="methodInput" />
                      <input type="text" placeholder="Account Holder"className="methodInput"/>
                    </div>
                  )}
              </div>
              
              <div className="methodContainer" onClick={() => handlePaymentChange('card')}>
                <div id="cardsInputContainer">
                  <input type="radio" name="payment" className='methodRadio' checked={selectedPayment === 'sepa'} onChange={() => {}}  />
                  <img src="./visa.png" alt="visa logo" width="40px" />
                  <img src="./masterCard.png" alt="master card logo" width="40px" />
                  <img src="./American-Express-Logo.png" alt="American Express logo" width="40px" />
                </div>
                {selectedPayment === 'card' && (
                  <div id="methodsInputContainer">
                    <input type="text" placeholder="Card Number" className="methodInput" />
                    <input type="text" placeholder="Card number mm/yy cvc"className="methodInput"/>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* <input type="radio" name="paypal" className="paymentMethod" /> */}
          <p id="inputContainerFooter">{t('securePayment')}</p>
        </div>
        <div id="infoContainer">
          <div>
            <h3>{t('orderOverview')}</h3>
            <div id="monthSelectionContainer">
              {[6, 9, 12, 18, 24, 36].map((month) => (
                <button key={month} type="button" className={`selectionBtn ${selectedMonth === month.toString()? 'selectedBtn': ''}`}
                  onClick={() => handleMonthChange(month.toString())}
                >
                  {month} {t('months')}
                </button>
              ))}
            </div>
          <div id="advancePaymentContainer">
            <Switch onChange={handleSwitchChange} />
            <label> {t('advancePay')} </label>
          </div>
          <div className='orderInfoContainer'>
          <p className="orderInfoText">{t('numberofsessions')}</p>
          <p className='orderInfoValue'>{selectedSessionNumber}</p>
          </div>
          <div className='orderInfoContainer'>
          <p className="orderInfoText">{t('regularPrice')}</p>
          <p className='orderInfoValue strike'>{isRtl ?'29.60 درهم':'29.60$'}</p>
          </div>
          <div className='orderInfoContainer'>
          <p className="orderInfoText">{t('yourPrice')}</p>
          <p className='orderInfoValue'>{isRtl ? '28.40 درهم':'28.40$'}</p>
          </div>
          <div className='orderInfoContainer'>
          <p className='discountText'>{t('discount')}</p>
          <p className='discountText big'>{isRtl ? '-9.60 درهم':'-9.60$'}</p>
          </div>
          <div className='break'></div>
          <div className='orderInfoContainer'>
          <p className="orderInfoText">{t('setupFee')}</p>
          <p className='totalText big'>{isRtl ? '0.00 درهم':'0.00$'}</p>
          </div>
          <div className='orderInfoContainer'>
          <p className="orderInfoText">{t('Total')}</p>
          <p className='totalText big'>total</p>
          </div>
          <div id="termsContainer">
          <input type="checkbox" name="terms" id="termsCheckbox" />
          <label htmlFor="terms" id="termsLabel">{isRtl ?"انا اوافق علي ":"I accept the"} <a href="#">{isRtl ? "الشروط والأحكام":"terms & conditions"}</a> 
          {isRtl ?"وأفهم ":" and understand"} <a href="#">{isRtl ? "حقي في التراجع":"right of widthdrawal"}</a> 
           {isRtl ?"كذلك الظروف التي تؤدي للمثل ":" as well as the cirumstances that lead to repeal of the same"}
          </label>
          </div>
          <button type='submit' id="submitButton">{t('orderNow')}</button>
          </div>
          <p id="infoContainerFooter">{t('satisfactionRate')}</p>
        </div>
      </form>
    </main>
  )
}
export default App
