<script setup lang="ts">
interface Props {
    src: string;
}
const props = withDefaults(defineProps<Props>(), {});

interface Emits {
    (e: "update:src", value: string): void;
}
const emit = defineEmits<Emits>();

const { data: fileData, open } = useFileSystemAccess({
    dataType: "Blob",
});

watch(fileData, async () => {
    if (!fileData.value) {
        return DEFAULT_CHARACTER_AVATAR;
    }
    const dataURL = await blobToDataURL(fileData.value);
    emit("update:src", dataURL);
});
</script>

<template>
    <div class="avatar cursor-pointer" @click="open()">
        <div class="w-48 rounded-full">
            <img :src="src || DEFAULT_CHARACTER_AVATAR" />
        </div>
    </div>
</template>
