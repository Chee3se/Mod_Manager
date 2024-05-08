import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-col bg-white overflow-hidden h shadow-sm sm:rounded-lg">
                        {auth.role.includes('admin') ?
                            <>
                                <p className="p-6 text-gray-900">Welcome Admin!</p>
                                <Link
                                    href={route('games.create')}
                                    className={"bg-blue-500 hover:bg-blue-700 w-max text-white font-bold rounded py-2 px-4 m-6"}
                                >
                                    Add a game
                                </Link>
                            </>
                            :
                                <p className="p-6 text-gray-900">Welcome User!</p>
                        }
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
