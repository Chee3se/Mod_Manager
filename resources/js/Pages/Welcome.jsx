import { Link, Head } from '@inertiajs/react';
import ApplicationLogo from "@/Components/ApplicationLogo.jsx";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 text-black/50">
                <div className="relative min-h-screen flex flex-col items-center justify-center">
                    <div className="relative w-full h-screen max-w-2xl px-6 lg:max-w-7xl">
                        <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
                            <div className="flex lg:ml-6 lg:justify-left lg:col-start-1">
                                <ApplicationLogo className={"h-12 w-auto text-white lg:h-16 lg:text-[#FF2D20]"} />
                            </div>
                            <nav className="-mx-3 flex flex-1 justify-end lg:col-start-3">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                            <h1 className="justify-self-center title-gradient col-span-full text-6xl text-black">Welcome to ModMan!</h1>
                        </header>

                        <main className="mt-6">
                            <h2 className="text-4xl text-black text-center">Get started with ModMan</h2>
                            <p className="text-xl mt-4 text-black text-center w-1/2 mx-auto">Get started and start using ModMan now by making a brand new account by signing up!</p>
                            <div className="flex justify-center mt-6 gap-4">
                                <Link
                                    href={route('register')}
                                    className="register-button"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        </main>

                        <footer className="absolute left-0 bottom-0 h-fit my-4 mb-5 w-full">
                            <p className="text-black text-center py-auto">Copyright © 2024 You copy, You gay</p>
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
