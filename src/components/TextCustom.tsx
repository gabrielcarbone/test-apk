import React, { useState, useRef, useEffect } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';
import './TextCustom.css';

interface TextCustomProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  id?: string;
  readOnly?: boolean;
  showPasswordToggle?: boolean;
  showClearButton?: boolean;
  onClear?: () => void;
  spellCheck?: boolean;
}

const TextCustom: React.FC<TextCustomProps> = ({ 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  className,
  id,
  readOnly,
  showPasswordToggle = false,
  showClearButton = false,
  onClear,
  spellCheck
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [wasFocused, setWasFocused] = useState(false);
  
  const isPasswordType = type === "password";
  const shouldShowToggle = isPasswordType && showPasswordToggle;
  const shouldShowClear = showClearButton && value && value.length > 0;
  const needsContainer = shouldShowToggle || shouldShowClear;
  const inputType = isPasswordType && showPassword ? "text" : type;

  // Manejar focus cuando cambia la estructura
  useEffect(() => {
    if (wasFocused && inputRef.current) {
      inputRef.current.focus();
      setWasFocused(false);
    }
  }, [needsContainer, wasFocused]);

  const handleFocus = () => {
    setWasFocused(true);
  };

  const handleBlur = () => {
    setWasFocused(false);
  };
  
  // Siempre usar estructura con container para evitar cambios de DOM
  return (
    <div className="text-custom-container">
      <input 
        ref={inputRef}
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={className}
        id={id}
        readOnly={readOnly}
        onFocus={handleFocus}
        onBlur={handleBlur}
        spellCheck={spellCheck}
      />
      
      {shouldShowClear && (
        <button
          type="button"
          onClick={onClear}
          className="clear-toggle-btn"
          tabIndex={-1}
        >
          <X size={16} />
        </button>
      )}
      
      {shouldShowToggle && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="password-toggle-btn"
          tabIndex={-1}
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      )}
    </div>
  );
};

export default TextCustom;