<template>
    <div>
        <v-card>
            <v-card-title>Store Parts</v-card-title>
            <v-card-text>
                <v-data-table 
                    :items.sync="parts"
                    :headers= "headers"
                    :items-per-page='15'
                >
                    <template v-slot:top>
                        <v-row>
                            <v-col cols=5>
                                <v-text-field
                                    v-model="searchText"
                                    label="search..."
                                    @keyup="search()"
                                    ></v-text-field>

                            </v-col>
                            <v-col cols=5>
                                <v-select
                                    clearable
                                    :items="types"
                                    v-model="selectedType"
                                    label="Select a Type"
                                    @change="filterType()">
                                </v-select>

                            </v-col>
                            <v-col cols=2>
                                <v-btn
                                    v-if="sort == 'down' || sort == null"
                                    class="ma-2"
                                    text
                                    icon
                                    color="blue lighten-2"
                                    @click="upSort"
                                >
                                    <v-icon>mdi-arrow-up</v-icon>
                                </v-btn>
                                <v-btn
                                    v-else
                                    class="ma-2"
                                    text
                                    icon
                                    color="blue lighten-2"
                                    @click="downSort"
                                >
                                    <v-icon>mdi-arrow-down</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>

                    </template>
                    <template v-slot:item.actions="{item}">
                        <v-btn
                            class="ma-2"
                            text
                            icon
                            color="blue lighten-2"
                            @click="goTo(item)"
                        >
                            Detalhes
                        </v-btn>
                    </template>

                </v-data-table>

            </v-card-text>
        </v-card>

</div>
</template>

<script>
export default {
    data() {
        return {
            parts: [],
            types: [],
            searchText: '',
            selectedType: null,
            sort: null,
            headers: [
                { text: 'Name', value: 'name'},
                { text: 'Type', value: 'type'},
                { text: 'Price', value: 'price'},
                { text: '', value: 'actions'}
                ]
        }
    },
    methods: {
        async search() {
            let url = '';
            if (this.searchText === '') {
                if (this.selectedType === null) {
                    url = `parts`;
                } else {
                    url = `parts?type=${this.selectedType}`;
                }
            } else {
                if (this.selectedType === null) {
                    url = `parts?query=${this.searchText.toLowerCase()}`;
                } else {
                    url = `parts?query=${this.searchText.toLowerCase()}&type=${this.selectedType}`;
                }
            }
            let { data } = await this.$http.get(url);
            this.parts = data;
        },
        async filterType() {
            this.searchText = '';
            let url = '';
                if (this.selectedType === null) {
                    url = `parts`;
                } else {
                    url = `parts?type=${this.selectedType}`;
                }
            let { data } = await this.$http.get(url);
            this.parts = data;

        },
        upSort() {
            this.sort = 'up';
            this.parts.sort((a,b) => {
                if (Number(a.price.replace('$','').trim()) > Number(b.price.replace('$','').trim())) {
                    return 1;
                } else if (Number(a.price.replace('$','').trim()) < Number(b.price.replace('$','').trim())) {
                    return -1;
                }
                return 0;
            })
        },
        downSort() {
            this.sort = 'down';
            this.parts.sort((a,b) => {
                if (Number(a.price.replace('$','').trim()) < Number(b.price.replace('$','').trim())) {
                    return 1;
                } else if (Number(a.price.replace('$','').trim()) > Number(b.price.replace('$','').trim())) {
                    return -1;
                }
                return 0;
            })
        },
        goTo(item) {
            sessionStorage.item = JSON.stringify(item);
            this.$router.replace('parts')
        }
    },
    async created() {
        let {data: tempParts} = await this.$http.get('parts');
        this.parts = tempParts
        let {data: tempTypes} = await this.$http.get('part-types');
        this.types = tempTypes
    }
}
</script>

<style>

</style>