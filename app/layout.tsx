import type { ReactNode } from 'react';
export const metadata = { title: 'GeoNexa Africa', description: 'Evidence-first geoscience intelligence for Africa' };
export default function RootLayout({children}:{children:ReactNode}) { return <html lang="en"><body style={{margin:0,fontFamily:'system-ui',background:'#081b27',color:'#edf6fa'}}>{children}</body></html>; }
