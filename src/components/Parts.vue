<template>
    <div>
        <v-card width='75%' class="mx-auto">
            <v-card-title>Part Detail</v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols=4 class="font-weight-bold">Name:</v-col>
                    <v-col cols=4>{{item.name}}</v-col>
                </v-row>
                <v-row>
                    <v-col cols=4 class="font-weight-bold">Type:</v-col>
                    <v-col cols=4>{{item.type}}</v-col>
                </v-row>
                <v-row>
                    <v-col cols=4 class="font-weight-bold">Price:</v-col>
                    <v-col cols=4>{{item.price}}</v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            item: null,
        }
    },
    created() {
        if (sessionStorage.item) this.item = JSON.parse(sessionStorage.item);
    }
}
</script>

<style>

</style>