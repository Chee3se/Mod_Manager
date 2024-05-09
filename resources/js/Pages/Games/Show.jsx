import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import { Head, Link } from '@inertiajs/react';

export default function Show({ auth, game, mods }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{game.name}</h2>}
            backgroundImage={game.background_image}
        >
            <Head title={game.name}/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="">
                        {mods.length === 0 ? (
                            <div className="flex items-center justify-center h-screen">
                                <p className="text-2xl font-semibold text-white">There are no mods :(</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {mods.map((mod) => (
                                    <div key={mod.id}
                                         className="bg-white rounded-lg overflow-hidden shadow-md transform transition-transform duration-500 hover:scale-105">
                                        <Link
                                            href={route('mods.show', [auth.user.name, mod.name])}
                                            className="block"
                                        >
                                            <img src={mod.image} alt={mod.name}
                                                 className="w-full object-center h-100"/>
                                            <div className="p-4">
                                                <h3 className="font-semibold text-lg text-gray-800 leading-tight text-center">{mod.name}</h3>
                                            </div>
                                        </Link>
                                        {auth.permissions.includes("edit games") &&
                                            <Link
                                                href={route('mods.edit', [auth.user.name, mod.name])}
                                                className="absolute left-0 top-0 m-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                            >
                                                Edit
                                            </Link>
                                        }
                                        {auth.permissions.includes("delete games") &&
                                            <Link
                                                href={route('mods.destroy', [auth.user.name, mod.name])}
                                                method="delete"
                                                className="absolute right-0 top-0 m-4 inline-block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                                            >
                                                Delete
                                            </Link>
                                        }
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
