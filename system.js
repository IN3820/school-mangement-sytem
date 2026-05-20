
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            display: ['Outfit', 'sans-serif'],
            body: ['DM Sans', 'sans-serif'],
          },
          colors: {
            brand: {
              50:  '#eef2ff',
              100: '#e0e7ff',
              200: '#c7d2fe',
              300: '#a5b4fc',
              400: '#818cf8',
              500: '#6366f1',
              600: '#4f46e5',
              700: '#4338ca',
              800: '#3730a3',
              900: '#312e81',
            }
          },
          boxShadow: {
            'card': '0 1px 3px 0 rgba(0,0,0,.06), 0 4px 16px -2px rgba(0,0,0,.08)',
            'card-hover': '0 4px 6px 0 rgba(0,0,0,.07), 0 12px 28px -4px rgba(0,0,0,.12)',
            'sidebar': '4px 0 24px -2px rgba(0,0,0,.18)',
          }
        }
      }
    }
  