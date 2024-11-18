import './App.css';
import './assets/inputStyling.css';
import './assets/responsive.css';
import Switch from './components/switch';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import i18n from 'i18next';
import Flag from 'react-world-flags';
import PhoneInput from './components/PhoneInput';
import {useArabicNumber} from '../config/i18n';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import axios from 'axios';

//form schema using zod for validation and error handling
const formSchema = z.object({
  loginPhone:z.string().min(10, {message: 'Please enter a valid phone number'}),
  contactPhone:z.string().min(10, { message: 'Please enter a valid phone number' }),
  contactEmail:z.string().email({ message: 'Please enter a valid email address' }),
  contactName:z.string().min(1, { message: 'Please enter a valid name' }),
  adress:z.string().min(1, { message: 'Please enter a valid address' }),
  adressNr:z.string().min(1, { message: 'Please enter a valid address number' }),
  adressCity:z.string().min(1, { message: 'Please enter a valid city' }),
  adressPostalCode:z.string().min(1, { message: 'Please enter a valid postal code' }),
  adressCountry:z.string().min(1, { message: 'Please enter a valid country' }),
  monthlySessions:z.string().min(1, { message: 'Please enter a valid number of sessions' }),
  paymentMethod:z.enum(['sepa','card']),
  iban: z.string().optional().refine(val => !val || val.length >= 15, {
    message: 'Invalid IBAN',
  }),
  accountHolder: z.string().optional().refine(val => !val || val.length >= 2, {
    message: 'Account holder name required',
  }),
  cardHolder: z.string().optional().refine(val => !val || val.length >= 2, {
    message: 'Card holder name required',
  }),
  cardNumber: z.string().optional().refine(val => !val || val.length >= 16, {
    message: 'Invalid card number',
  }),
  selectedMonth:z.string().min(1, { message: 'Please select a month' }),
})

type FormData=z.infer<typeof formSchema>;


function App() {

  //importing translations and locale 
  const {t} = useTranslation();
  const isRtl = i18n.language === 'ar'; 
  const {formatNumber} = useArabicNumber();

  //state managment
  const [selectedPayment, setSelectedPayment] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedSessionNumber, setSelectedSessionNumber] = useState<number>(0);
  const [advancePayEnabled, setAdvancePayEnabled] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  //form handling using react hook form 
  const {register,handleSubmit,formState:{errors},watch,setValue,}=useForm<FormData>({
      resolver:zodResolver(formSchema),
  })

  const selectedPaymentMethod = watch('paymentMethod');

  //sumbission logic using axios 
  const onSubmit = async (data:FormData)=>{
    try{
      const response = await axios.post('https://webisite.com/purchase-form',data);
    }catch(error){
      console.error('Error submitting form:',error);
    }
  }

  //event handlers
  const changeLanguage = (language: string)=>{
    i18n.changeLanguage(language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }

  const handlePaymentChange = (method: 'sepa' | 'card') => {
    setValue('paymentMethod', method);
  };

  const handleMonthChange = (month:string) => {
    setValue('selectedMonth', month);
  };

  const handleSwitchChange = (isOn: boolean) => {
    setAdvancePayEnabled(isOn);
  };

  const handleSessionNumberChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = parseInt(e.target.value, 10);
      setSelectedSessionNumber(value);
  };

  //calculation function 
  const calculateTotal = () => {
    return selectedSessionNumber * 28.40;
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
    <>
    <section>
    <button className="langChangeBtn" onClick={()=> changeLanguage(isRtl ? 'en':'ar')}>{isRtl ? <Flag code="GB" />  :<Flag code="AE" /> }</button>
      <form  onSubmit={handleSubmit(onSubmit)} id="form">
        <div id="inputContainer">
          <div>
            <h1 id="formHeading">{t('heading')}</h1>
            <p id="formSubHeading">{t('subHeading')}</p>
          </div>
          <div>
          <label htmlFor="loginNumber" className="inputLabels">{t('loginPhone')}</label>
          <p className='labelSublement'>{isRtl ? <b>(يفضل أن يكون <u>التلميذ</u>)</b>:<b> (preferably the <u>student's</u>)</b>}</p>
          </div>
          <PhoneInput 
          isRtl={isRtl} 
          name="loginPhone" 
          value={watch('loginPhone') || ''} 
          onChange={(value)=>{setValue('loginPhone', value);}} 
          error={errors.loginPhone?.message} 
          />
          <div>
          <label htmlFor="contactNumber" className="inputLabels">{t('contactPhone')}</label>
          <p className='labelSublement'>{isRtl ? <b>(يفضل أن يكون <u>الأب</u>)</b>:<b> (preferably the <u>parent's</u>)</b>}</p>
          </div>
          {/* <input type="number" name="contactNumber" className="numberInput formInput" /> */}
          <PhoneInput 
          isRtl={isRtl} 
          name="contactPhone" 
          value={watch('contactPhone') || ''} 
          onChange={(value)=>{setValue('contactPhone', value);}} 
          error={errors.loginPhone?.message} 
          />
          <div>
          <label htmlFor="email" className="inputLabels">{t('contactEmail')}</label>
          <p className='labelSublement'>{isRtl ? <b>(يفضل أن يكون <u>الأب</u>)</b>:<b> (preferably the <u>parent's</u>)</b>}</p>
          </div>
          <input {...register('contactEmail')} type="email"  className="textInput formInput" />
          {errors.contactEmail && <span className="error">{errors.contactEmail.message}</span>}
          <label htmlFor="contactName" className="inputLabels">{t('contactName')}</label>
          <input {...register('contactName')} type="text" className="textInput formInput"  />
          {errors.contactName && <span className="error">{errors.contactName.message}</span>}
          <label htmlFor="billingAdress" className="inputLabels">{t('billingAddress')}</label>
          <div id="billingAdressContainer">
            <div id="billingAdressRow1">
              <input {...register('adress')} type="text"  id="adress" className="adressInput" placeholder={isRtl ? 'العنوان':'Address'} />
              {errors.adress && <span className="error">{errors.adress.message}</span>}
              <input {...register('adressNr')} type="text"  id="adressX " className="adressInput" placeholder={isRtl ? 'مم':'Nr'} />
              {errors.adressNr && <span className="error">{errors.adressNr.message}</span>}
            </div>
            <div id="billingAdressRow2">
              <input {...register('adressPostalCode')} type="text"  className="adressInput" placeholder={isRtl ? 'الرمز البريدي':'Postal Code'} />
              {errors.adressPostalCode && <span className="error">{errors.adressPostalCode.message}</span>}
              <input {...register('adressCity')}type="text" className="adressInput" placeholder={isRtl ? 'المدينة':'City'} />
              <select 
                {...register('adressCountry')}
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
              {errors.adressCountry && <span className="error">{errors.adressCountry.message}</span>}
            </div>
          </div>
          <label htmlFor="monthlySessinos" className="inputLabels">{t('monthlySessions')}</label>
          <select {...register('monthlySessions', {valueAsNumber:true})} id="monthlySessions" onChange={(e)=>handleSessionNumberChange(e)} >
                <option value="" disabled>
                  {isRtl ? 'عدد الجلسات' : 'No. of Sessions'}
                </option>
                {sessionsNumber.map((session)=>(
                  <option key={session.value} value={session.value}>
                    {session.label}
                  </option>
                ))}
          </select>
          {errors.monthlySessions && <span className="error">{errors.monthlySessions.message}</span>}
          <div >
            <label className="inputLabels">{t('paymentSelect')}</label>
            <div>
              <div className="methodContainer" onClick={() => handlePaymentChange('sepa')}>
                  <div>
                  <input type="radio" {...register('paymentMethod')} value="sepa" className='methodRadio' onChange={() => {handlePaymentChange('sepa')}}/>
                    <img src="./sepa.png" alt="sepa logo" width="50px" />
                  </div>
                  {selectedPayment === 'sepa' && (
                    <div id="methodsInputContainer">
                      <input {...register('iban')} type="number" placeholder={isRtl ? "الأيبتم":"IBAN"} className="methodInput" />
                      {errors.iban && <span className="error">{errors.iban.message}</span>}
                      <input {...register('accountHolder')} type="text" placeholder={isRtl ? "صاحب الأكونت":"Account Holder"} className="methodInput"/>
                      {errors.accountHolder && <span className="error">{errors.accountHolder.message}</span>}
                    </div>
                  )}
              </div>
              
              <div className="methodContainer" onClick={() => handlePaymentChange('card')}>
                <div id="cardsInputContainer">
                  <input type="radio" {...register('paymentMethod')} className='methodRadio' value='card'  onChange={() => {handlePaymentChange('card')}}  />
                  <img src="./visa.png" alt="visa logo" width="40px" />
                  <img src="./masterCard.png" alt="master card logo" width="40px" />
                  <img src="./American-Express-Logo.png" alt="American Express logo" width="40px" />
                </div>
                {selectedPayment === 'card' && (
                  <div id="methodsInputContainer">
                    <input {...register('cardHolder')} type="text" placeholder={isRtl ? 'اسم حامل البطاقة':'Card holder'} className="methodInput" />
                    {errors.cardHolder && <span className="error">{errors.cardHolder.message}</span>}
                    <input {...register('cardNumber')} type="text" maxLength={25} pattern="^(\d{4}\s){3}\d{4}\s\d{2}\/\d{2}\s\d{3}$" placeholder={isRtl ? "رقم البطاقة           شهر/سنة         الرقم السري":"Card number            mm/yy          cvc"} className="methodInput"/>
                    {errors.cardNumber && <span className="error">{errors.cardNumber.message}</span>}
                  </div>
                )}
              </div>
            </div>
          </div>
          <p id="inputContainerFooter">{t('securePayment',{percent:formatNumber(100)})}</p>
        </div>
        <div id="infoContainer">
          <div>
            <h3>{t('orderOverview')}</h3>
            <div id="monthSelectionContainer">
              {[6, 9, 12, 18, 24, 36].map((month) => (
                <button key={month} type="button" className={`selectionBtn ${selectedMonth === month.toString()? 'selectedBtn': ''}`}
                  onClick={() => handleMonthChange(month.toString())}
                >
                  {t(`${month}month`,{number:formatNumber(month)})}
                </button>
              ))}
            </div>
          <div id="advancePaymentContainer">
            <Switch onChange={handleSwitchChange} isRtl={isRtl} />
            <label> {t('advancePay',{percent:formatNumber(5)})} </label>
          </div>
          <div className='orderInfoContainer'>
          <p className="orderInfoText">{t('numberofsessions')}</p>
          <p className='orderInfoValue'>{selectedSessionNumber}</p>
          </div>
          <div className='orderInfoContainer'>
          <p className="orderInfoText">{t('regularPrice')}</p>
          <p className='orderInfoValue strike'>{isRtl ?`${formatNumber(29.60)} درهم`:'29.60$'}</p>
          </div>
          <div className='orderInfoContainer'>
          <p className="orderInfoText">{t('yourPrice')}</p>
          <p className='orderInfoValue'>{isRtl ? `${formatNumber(28.40)} درهم`:'28.40$'}</p>
          </div>
          <div className='orderInfoContainer'>
          <p className='discountText'>{t('discount',{percent:formatNumber(4)})}</p>
          <p className='discountText big'>{isRtl ? `${formatNumber(-9.60)} درهم`:'-9.60$'}</p>
          </div>
          <div className='break'></div>
          <div className='orderInfoContainer'>
          <p className="orderInfoText">{t('setupFee')}</p>
          <p className='totalText big'>{isRtl ? `${formatNumber(0.00)} درهم`:'0.00$'}</p>
          </div>
          <div className='orderInfoContainer'>
          <p className="orderInfoText">{t('Total')}</p>
          <p className='totalText big'>{isRtl ? `${formatNumber(calculateTotal())} درهم` : `${calculateTotal().toFixed(2)}$`}</p>
          </div>
          <div id="termsContainer">
          <input type="checkbox" name="terms" id="termsCheckbox" checked={termsAccepted} onChange={(e)=>setTermsAccepted(e.target.checked)}/>
          <label htmlFor="terms" id="termsLabel">{isRtl ?"انا اوافق علي ":"I accept the"} <a href="#">{isRtl ? "الشروط والأحكام ":" terms & conditions"}</a> 
          {isRtl ?"وأفهم ":" and understand"} <a href="#">{isRtl ? "حقي في التراجع ":" right of widthdrawal"}</a> 
           {isRtl ?"كذلك الظروف التي تؤدي للمثل ":" as well as the cirumstances that lead to repeal of the same"}
          </label>
          </div>
          <button disabled={!termsAccepted} type='submit' id="submitButton">{t('orderNow')}</button>
          </div>
          <p id="infoContainerFooter">{t('satisfactionRate',{percent:formatNumber(95)})}</p>
        </div>
      </form>
      </section>
    </>
  )
}
export default App
