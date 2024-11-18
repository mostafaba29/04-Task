import {useState} from 'react';
import { ChevronDown } from 'lucide-react';
import Flag from 'react-world-flags';
import '../assets/phoneInput.css';

type country = {
    code: string;
    nameEn: string;
    nameAr: string;
    prefix: string;
  };
const countries: country[] = [
    { code: 'GR', nameEn: 'Greece',nameAr:'اليونان', prefix: '+30' },
    { code: 'US', nameEn: 'United States',nameAr:'الولايات المتحدة الأمريكية',prefix: '+1' },
    { code: 'GB', nameEn: 'United Kingdom',nameAr:'المملكة المتحدة', prefix: '+44' },
    { code: 'DE', nameEn: 'Germany', nameAr:'ألمانيا',prefix: '+49' },
    { code: 'FR', nameEn: 'France', nameAr:'فرنسا',prefix: '+33' },
    { code:'AE', nameEn: 'United Arab Emirates',nameAr:'الإمارات العربية المتحدة' ,prefix: '+971'},
    { code:'SA',nameEn:'Saudi Arabia', nameAr:'المملكة العربية السعودية' ,prefix: '+966'},
    { code:'EG',nameEn:'Egypt', nameAr:'مصر' ,prefix: '+20'},
  ];

interface PhoneInputProps {
    isRtl:boolean;
}

function PhoneInput ({isRtl}:PhoneInputProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(countries[0]);
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleCountrySelect = (country:country) => {
        setSelectedCountry(country);
        setIsOpen(false);
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        setPhoneNumber(value);
    };

    return (
        <div className="phone-input-container">
            <div className="phone-input-wrapper">
                <button
                type='button'
                className="country-selector"
                onClick={() => setIsOpen(!isOpen)}
                >
                <Flag code={selectedCountry.code} height={10}/>
                <span className="country-prefix">{selectedCountry.prefix}</span>
                <ChevronDown className="chevron-icon" />
                </button>
                <input
                type="tel"
                className="phone-input"
                value={phoneNumber}
                onChange={handlePhoneChange}
                />
            </div>

            {isOpen && (
                <div className="country-dropdown">
                {countries.map((country) => (
                    <button
                    key={country.code}
                    className="country-option"
                    onClick={() => handleCountrySelect(country)}
                    >
                    <Flag code={country.code} height={10} />
                    <span className="country-name">{isRtl ? country.nameAr : country.nameEn}</span>
                    <span className="country-prefix-option">{country.prefix}</span>
                    </button>
                ))}
                </div>
            )}
        </div>
    )
}

export default PhoneInput;