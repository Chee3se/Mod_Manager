import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import FileInput from '@/Components/FileInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';

export default function Edit({ auth, game }) {
    const { data, setData, put, processing, errors } = useForm({
        _method: 'put',
        name: game.name,
        image: null,
        background_image: null,
    });

    const [previewImage, setPreviewImage] = useState(game.image);
    const [previewBackgroundImage, setPreviewBackgroundImage] = useState(game.background_image);

    const handleImageChange = (e) => {
        setData('image', e.target.files[0]);
        setPreviewImage(URL.createObjectURL(e.target.files[0]));
    };

    const handleBackgroundImageChange = (e) => {
        setData('background_image', e.target.files[0]);
        setPreviewBackgroundImage(URL.createObjectURL(e.target.files[0]));
    };

    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('image', data.image);
        formData.append('background_image', data.background_image);

        put(route('games.update', game.name), formData);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit {game.name}</h2>}
            backgroundImage={previewBackgroundImage}
        >
            <Head title={`Edit ${game.name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200 flex flex-col md:flex-row">
                            <form onSubmit={submit} encType="multipart/form-data" method="POST" className="md:w-1/2">
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
                                        defaultFile={game.image}
                                        className="mt-1 block w-full"
                                        onChange={handleImageChange}
                                    />
                                    <InputError message={errors.image} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="background_image" value="Background Image" />
                                    <FileInput
                                        id="background_image"
                                        name="background_image"
                                        defaultFile={game.background_image}
                                        className="mt-1 block w-full"
                                        onChange={handleBackgroundImageChange}
                                    />
                                    <InputError message={errors.background_image} className="mt-2" />
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <PrimaryButton className="ms-4" disabled={processing}>
                                        Update Game
                                    </PrimaryButton>
                                </div>
                            </form>

                            <div className="mt-8 md:mt-0 md:w-1/2 md:pl-8">
                                <div className="mt-4 bg-white rounded-lg overflow-hidden shadow-md transform transition-transform duration-500">
                                    <img src={previewImage} alt={data.name} className="w-full object-center h-100"/>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-lg text-gray-800 leading-tight text-center">{data.name}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
