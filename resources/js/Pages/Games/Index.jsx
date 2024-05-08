import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import { Head } from '@inertiajs/react';

export default function Index({ auth, games }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Games</h2>}
        >
            <Head title="Games" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-3 gap-4">
                        {games.map((game) => (
                            <div key={game.id} className="bg-white rounded-lg overflow-hidden shadow-md transform transition-transform duration-500 hover:scale-105">
                                <img src={game.image} alt={game.name} className="w-full object-center h-100"/>
                                <div className="p-4">
                                    <h3 className="font-semibold text-lg text-gray-800 leading-tight text-center">{game.name}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
