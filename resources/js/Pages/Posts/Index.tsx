import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

type Post = {
    id: number;
    body: string;
};

type Props = {
    posts: Post[];
};

export default function Index({ posts }: Props) {
    return (
        <AuthenticatedLayout>
            <Head title="Posts" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        {posts.map((post) => (
                            <div
                                key={post.id}
                                className="p-6 border-b text-gray-900"
                            >
                                {post.body}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}