import {useState, useEffect} from 'react';
import { ChevronDown } from 'lucide-react';
import Flag from 'react-world-flags';
import '../assets/phoneInput.css';

type country = {
    code: string;
    nameEn: string;
    nameAr: string;
    prefix: string;
};

//country list that can be extended  note:[code from react-world-flags library for flag icons]
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
    isRtl: boolean;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    name: string;
}

function PhoneInput({isRtl, value, onChange, error, name}: PhoneInputProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(countries[0]);
    const [localValue, setLocalValue] = useState('');

    // Initialize the component with the provided value
    useEffect(() => {
        if (value) {
            // Find the country prefix from the value
            const country = countries.find(c => value.startsWith(c.prefix));
            if (country) {
                setSelectedCountry(country);
                setLocalValue(value.slice(country.prefix.length));
            }
        }
    }, []);

    const handleCountrySelect = (country: country) => {
        setSelectedCountry(country);
        setIsOpen(false);
        const newValue = `${country.prefix}${localValue}`;
        onChange(newValue);
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.replace(/[^0-9]/g, '');
        setLocalValue(inputValue);
        const newValue = `${selectedCountry.prefix}${inputValue}`;
        onChange(newValue);
    };

    return (
        <div className="phone-input-container">
            <div className="phone-input-wrapper">
                <button
                    type="button"
                    className="country-selector"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <Flag code={selectedCountry.code} height={10}/>
                    <span className="country-prefix">{selectedCountry.prefix}</span>
                    <ChevronDown className="chevron-icon" />
                </button>
                <input
                    type="tel"
                    name={name}
                    className={`phone-input ${error ? 'error' : ''}`}
                    value={localValue}
                    onChange={handlePhoneChange}
                />
            </div>
            {error && <span className="error">{error}</span>}

            {isOpen && (
                <div className="country-dropdown">
                    {countries.map((country) => (
                        <button
                            type="button"
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
    );
}

export default PhoneInput;