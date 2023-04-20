<script setup lang="ts">
definePageMeta({
    middleware: ["auth"],
});

navigateTo({
    path: "/simulation-game",
});
</script>
