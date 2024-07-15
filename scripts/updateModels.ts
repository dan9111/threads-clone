const Thread = require("@/lib/models/thread.model").default;
const User = require("@/lib/models/user.model").default;
const { connectToDB } = require("@/lib/mongoose");

const updateAllProps = async () => {
    connectToDB();

    await User.updateMany({}, { $set: { liked_threads: [] } });
    await Thread.updateMany({}, { $set: { likedBy: [] } });
}

updateAllProps().catch((error) => {
    console.error(error);
});