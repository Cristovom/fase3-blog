// import React from 'react';
// import { Loader2 } from 'lucide-react';
// interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
//   isLoading?: boolean;
//   size?: 'sm' | 'md' | 'lg';
// }
// export function Button({ 
//   children, 
//   variant = 'primary', 
//   isLoading = false, 
//   size = 'md',
//   className = '',
//   disabled,
//   ...props 
// }: ButtonProps) {
  
//   const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none";
  
//   const variants = {
//     primary: "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500 shadow-sm",
//     secondary: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 focus:ring-slate-200 shadow-sm",
//     ghost: "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-200",
//     danger: "bg-red-50 text-red-600 hover:bg-red-100 focus:ring-red-200 border border-transparent"
//   };
//   const sizes = {
//     sm: "h-8 px-3 text-sm",
//     md: "h-10 px-4 py-2",
//     lg: "h-12 px-6 text-lg"
//   };
//   return (
//     <button 
//       className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
//       disabled={disabled || isLoading}
//       {...props}
//     >
//       {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
//       {children}
//     </button>
//   );
// }