<script setup>
const supabase = useSupabaseClient();

const loading = ref(true);
const username = ref("");
const website = ref("");
const avatar_path = ref("");

const user = useSupabaseUser();

let { data } = await supabase
    .from("profiles")
    .select(`username, website, avatar_url`)
    .eq("id", user.value.id)
    .single();

if (data) {
    username.value = data.username;
    website.value = data.website;
    avatar_path.value = data.avatar_url;
}

loading.value = false;

async function updateProfile() {
    try {
        loading.value = true;
        const user = useSupabaseUser();

        const updates = {
            id: user.value.id,
            username: username.value,
            website: website.value,
            avatar_url: avatar_path.value,
            updated_at: new Date(),
        };

        let { error } = await supabase.from("profiles").upsert(updates, {
            returning: "minimal", // Don't return the value after inserting
        });
        if (error) throw error;
    } catch (error) {
        alert(error.message);
    } finally {
        loading.value = false;
    }
}

async function signOut() {
    try {
        loading.value = true;
        let { error } = await supabase.auth.signOut();
        if (error) throw error;
        user.value = null;
    } catch (error) {
        alert(error.message);
    } finally {
        loading.value = false;
    }
}
</script>

<template>
    <div class="card self-center w-96 bg-base-100 shadow-xl">
        <figure class="px-10 pt-10">
            <img :src="avatar_path" alt="Shoes" class="rounded-xl" />
        </figure>
        <div class="card-body">
            <form class="form-control space-y-6" @submit.prevent="updateProfile">
                <h2 class="card-title">プロフィール</h2>

                <div class="space-y-4">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Email</span>
                        </label>
                        <input id="email" type="text" :value="user.email" class="input" disabled />
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Username</span>
                        </label>
                        <input type="text" class="input input-bordered" v-model="username" />
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Website</span>
                        </label>
                        <input type="text" class="input input-bordered" v-model="website" />
                    </div>
                </div>

                <div class="card-actions">
                    <button
                        type="submit"
                        class="btn btn-primary btn-block"
                        :value="loading ? 'Loading ...' : 'Update'"
                        :disabled="loading"
                    >
                        更新
                    </button>
                </div>
            </form>
        </div>
    </div>

    <div></div>

    <!-- <div>
            <button class="button block" @click="signOut" :disabled="loading">Sign Out</button>
        </div> -->
</template>
