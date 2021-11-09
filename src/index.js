import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

new Vue({
    el: '#app',
    data: {
        studentsList: [],
        search: '',
        piece: '',
        addForm: {
            mark: '',
            group: '',
            isDonePr: false,
            name: '',
        },
    },
    mounted: function () {
        axios.get('http://46.101.212.195:3000/students').then((response) => this.studentsList = response.data)
    },

    methods: {
        btnDelete: function (index) {
            console.log(index);
            console.log(this.studentsList);
            this.studentsList.splice(index, 1);
        },
        addStudent() {
            const id = this.studentsList.length + 1;
            this.studentsList.push({ id, ...this.addForm });
        },
    },
});