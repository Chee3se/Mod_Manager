import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import { Head, Link } from '@inertiajs/react';

export default function Show({ auth, game, mod, creator }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{mod.name}</h2>}
            backgroundImage={game.background_image}
        >
            <Head title={mod.name}/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-col bg-white overflow-hidden h shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex items-start space-x-4">
                                <img src={mod.image} alt={mod.name} className="object-center h-40"/>
                                <div>
                                    <h2 className="p-2 text-3xl font-extrabold">{mod.name}</h2>
                                    <p className="p-2">{mod.description}</p>
                                    <p className="p-2 text-xl">Created by {creator.name}</p>
                                </div>
                            </div>
                            <tbody>
                                <tr>
                                    <td className="p-2 text-xl font-semibold">Last updated</td>
                                    <td className="p-2">{mod.created_at}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 text-xl font-semibold">Categories</td>
                                    <td className="p-2"></td>
                                </tr>
                            </tbody>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
