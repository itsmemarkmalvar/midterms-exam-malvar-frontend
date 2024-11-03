const sanitizeInput = {
  text: (value) => {
    if (!value) return '';
    // Only remove HTML tags and dangerous characters, preserve spaces
    return value
      .replace(/<[^>]*>/g, '')
      .replace(/[<>]/g, ''); 
  },
  
  number: (value) => {
    // Ensure it's a valid number
    const num = parseInt(value, 10);
    return isNaN(num) ? '' : num;
  },

  description: (value) => {
    if (!value) return '';
    // Allow basic formatting but remove potentially harmful tags
    return value
      .replace(/<(script|iframe|object|embed|form|input|style|meta)[^>]*>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+=/gi, '');
  }
};

export default sanitizeInput; 