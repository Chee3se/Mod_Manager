import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import FileInput from '@/Components/FileInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        image: null,
        background_image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('image', data.image);
        formData.append('background_image', data.background_image);

        post(route('games.store'), formData);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add a Game</h2>}
        >
            <Head title="Add Game" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={submit} encType="multipart/form-data" method="POST">
                                <div>
                                    <InputLabel htmlFor="name" value="Game Name" />
                                    <TextInput
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="image" value="Game Image" />
                                    <FileInput
                                        id="image"
                                        name="image"
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('image', e.target.files[0])}
                                    />
                                    <InputError message={errors.image} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="background_image" value="Background Image" />
                                    <FileInput
                                        id="background_image"
                                        name="background_image"
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('background_image', e.target.files[0])}
                                    />
                                    <InputError message={errors.background_image} className="mt-2" />
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <PrimaryButton className="ms-4" disabled={processing}>
                                        Add Game
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
