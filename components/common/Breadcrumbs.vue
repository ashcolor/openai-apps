<script setup lang="ts">
interface Breadcrumb {
    name: string;
    path?: string;
    icon?: string;
}

interface Props {
    breadcrumbs: Array<Breadcrumb>;
}

const props = withDefaults(defineProps<Props>(), {});
</script>

<template>
    <div class="text-sm breadcrumbs">
        <ul>
            <li v-for="breadcrumb in props.breadcrumbs">
                <template v-if="breadcrumb.path"
                    ><NuxtLink :to="breadcrumb.path">
                        <Icon v-if="breadcrumb.icon" :name="breadcrumb.icon"></Icon>
                        {{ breadcrumb.name }}
                    </NuxtLink>
                </template>
                <template v-else>
                    <Icon v-if="breadcrumb.icon" :name="breadcrumb.icon"></Icon>
                    {{ breadcrumb.name }}
                </template>
            </li>
        </ul>
    </div>
</template>
