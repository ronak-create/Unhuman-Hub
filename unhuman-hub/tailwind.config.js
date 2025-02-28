module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
      extend: {},
    },
    plugins: [],
    theme: {
        extend: {
          animation: {
            blob: 'blob 7s infinite',
          },
          keyframes: {
            blob: {
              '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
              '50%': { transform: 'translate(30px, -30px) scale(1.1)' },
            },
          },
        },
      },
      
  };
  