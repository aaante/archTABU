import Get from "./Get";
import Post from "./Post";
import Put from "./Put";
import Delete from "./Delete";

export default async function Page() {
    return (
        <>
            <h1>archTABU 🏛️</h1>

            <Post />

            <Get />

            <Put />

            <Delete />
        </>
    );
}
