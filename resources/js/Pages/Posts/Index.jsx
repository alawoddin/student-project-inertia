import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head,useForm,router,Link, usePage  } from '@inertiajs/react';
import { useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';

export default function Dashboard({ auth, posts , greeting ,message  }) {
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm("StorePost", {
            body: "",
        });

        const page = usePage();

        useEffect(() => {
            if (page?.props?.message?.body) {       
            toast(page.props.message.body , {
                type: page.props.message.type,
                position: 'top-right',
            })
        }
        } , [page.props.message]);

    function submit(e) {
        e.preventDefault();
        post(route("store.post"), {
            onSuccess: () => {
                reset("body");
            toast.success('Post Create Successfully !' , {
                position: 'top-right',
            })
            },
        });
    }

          function refreshPosts() {
            router.visit(route('all.post'),{
                only: ['posts'],
                preserveScroll : true,
                preserveState : true,
               
            })
        }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Posts
                </h2>
            }
        >
            <Head title="Posts">
                <meta name="description" content="Posts Index" />
            </Head>

            <div className="py-12">
                     {greeting}

                {/* { data.body } */}
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8 space-y-3">
                     {/* {now} */}
                {page.props.can.post_create && (
                     <form
                        onSubmit={submit}
                        className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6"
                    >
                        <label htmlFor="body" className="sr-only text-dark">
                            Body
                        </label>
                        <textarea
                            onChange={(e) => setData("body", e.target.value)}
                            onFocus={() => clearErrors("body")}
                            name="body"
                            id="body"
                            cols="30"
                            rows="5"
                            value={data.body}
                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full"
                        ></textarea>
                        {errors.body && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.body}
                            </p>
                        )}

                        <button
                            type="submit"
                            // mt-2 bg-gray-700 px-4 py-2 rounded-md font-medium text-dark
                            disabled={processing}
                            className={`inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ${processing && "opacity-25"}`}
                        >
                            Post
                        </button>
                    </form>

                )}
                     <div className="py-3 flex justify-center">
                    <Link
                    href={route('all.post')}
                    only={['posts']}
                    preserveScroll
                        className="text-sm text-indigo-700"
                        type="button"
                    >
                        Refresh posts
                    </Link>

                     {/* <button
                    onClick={refreshPosts}
                        className="text-sm text-indigo-700"
                        type="button"
                    >
                        Refresh posts
                    </button>
                    </button> */}
                </div>

                    {posts.map((post) => {
                        return (
                            <div key={post.id} className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 text-gray-900">
                                    <div className="font-semibold">
                                        {post.user.name}
                                    </div>
                                    <p className="mt-1">{post.body}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
