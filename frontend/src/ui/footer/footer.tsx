import type {SVGAttributes} from "react";

export async function Footer() {
    return (
        <footer className="w-full bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-800 text-neutral-100">
            {/* Main footer content */}
            <div className="container mx-auto max-w-7xl px-6 py-16">
                <div className="flex flex-col items-center justify-center text-center space-y-8">
                    {/* Logo & Brand */}
                    <div className="space-y-4">
                        <h3 className="text-3xl font-bold text-white tracking-tight">
                            Strumion Apartments
                        </h3>
                        <p className="text-neutral-400 max-w-md mx-auto leading-relaxed">
                            Professional apartment management platform for modern property owners and renters.
                        </p>
                    </div>

                    {/* Contact Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
                        <div className="group bg-neutral-800/50 backdrop-blur-sm rounded-xl p-6 border border-neutral-700/50 hover:border-neutral-600 transition-all duration-300 hover:shadow-lg hover:shadow-neutral-900/50">
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-neutral-700/50 flex items-center justify-center group-hover:bg-neutral-600/50 transition-colors">
                                    <LocationIcon className="h-6 w-6 text-neutral-300 group-hover:text-white transition-colors"/>
                                </div>
                                <div>
                                    <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Location</p>
                                    <p className="text-neutral-200 font-medium">Bitola, Macedonia</p>
                                </div>
                            </div>
                        </div>

                        <div className="group bg-neutral-800/50 backdrop-blur-sm rounded-xl p-6 border border-neutral-700/50 hover:border-neutral-600 transition-all duration-300 hover:shadow-lg hover:shadow-neutral-900/50">
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-neutral-700/50 flex items-center justify-center group-hover:bg-neutral-600/50 transition-colors">
                                    <PhoneIcon className="h-6 w-6 text-neutral-300 group-hover:text-white transition-colors"/>
                                </div>
                                <div>
                                    <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Phone</p>
                                    <a href="tel:+38975506865" className="text-neutral-200 font-medium hover:text-white transition-colors">
                                        +389 75 506 865
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="group bg-neutral-800/50 backdrop-blur-sm rounded-xl p-6 border border-neutral-700/50 hover:border-neutral-600 transition-all duration-300 hover:shadow-lg hover:shadow-neutral-900/50">
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-neutral-700/50 flex items-center justify-center group-hover:bg-neutral-600/50 transition-colors">
                                    <EmailIcon className="h-6 w-6 text-neutral-300 group-hover:text-white transition-colors"/>
                                </div>
                                <div>
                                    <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Email</p>
                                    <a href="mailto:contact@strumion.mk" className="text-neutral-200 font-medium hover:text-white transition-colors">
                                        contact@strumion.mk
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Decorative divider */}
                    <div className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent"></div>

                    {/* Social links (optional - uncomment if needed) */}
                    {/* <div className="flex items-center gap-6">
                        <a href="#" className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-neutral-700 transition-colors">
                            <FacebookIcon className="h-5 w-5" />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-neutral-700 transition-colors">
                            <InstagramIcon className="h-5 w-5" />
                        </a>
                    </div> */}
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-neutral-800/50">
                <div className="container mx-auto max-w-7xl px-6 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-500">
                        <div className="flex items-center gap-2">
                            <span>© {new Date().getFullYear()} Strumion Apartments</span>
                            <span className="hidden md:inline">•</span>
                            <span className="hidden md:inline">All rights reserved</span>
                        </div>
                        {/*<div className="flex items-center gap-1">*/}
                        {/*    <span>Made with</span>*/}
                        {/*    <HeartIcon className="h-4 w-4 text-red-500 animate-pulse" />*/}
                        {/*    <span>by Strumion Team</span>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </footer>
    );
}

// Icon components
function LocationIcon(props: SVGAttributes<SVGSVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
             stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1 1 15 0Z"/>
        </svg>
    );
}

function PhoneIcon(props: SVGAttributes<SVGSVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
             stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"/>
        </svg>
    );
}

function EmailIcon(props: SVGAttributes<SVGSVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
             stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"/>
        </svg>
    );
}

function HeartIcon(props: SVGAttributes<SVGSVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
        </svg>
    );
}