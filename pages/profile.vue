<script setup lang="ts">
const supabase = useSupabaseClient();

const user = useSupabaseUser();
console.log(user.value);

if (!user.value) {
    navigateTo({
        path: "/signin",
        // query: {
        //     redirect_to: name.value,
        //     type: type.value,
        // },
    });
}
</script>
<template>
    <div></div>
    <!-- <ProfileAccount></ProfileAccount> -->
</template>
