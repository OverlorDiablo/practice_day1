<template>
  <div>
    <table>
      <tr v-for="student in students" v-bind:key="student._id">
        <td>{{ student.name }}</td>
        <td>{{ student.group }}</td>
        <td><input type="checkbox" v-model="student.isDonePr" /></td>

        <td>
          <button class="btn" v-on:click="btnDelete(student._id)">
            Удалить
          </button>
        </td>
      </tr>
    </table>

    <br />
    <input type="text" v-model="studentName" />
    <input type="text" v-model="studentGroup" />
    <input type="checkbox" v-model="studentPr" />

    <button @click="addStudent">Добавить</button>
  </div>
</template>



<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

var students = [];
var newStudent = {};

export default {
  data: function () {
    return {
      students: students,
      newStudent: newStudent,
      studentId: null,
      studentName: "",
      studentGroup: "",
      studentPr: null,
    };
  },

  mounted: function () {
    Vue.axios
      .get("http://46.101.212.195:3000/students")
      .then(({ data: students }) => {
        this.students = [...students];
      });
  },

  methods: {
    btnDelete: function (id) {
      Vue.axios
        .delete(`http://46.101.212.195:3000/students/${id}`)
        .then(
          () =>
            (this.students = this.students.filter(
              (student) => student._id !== id
            ))
        );
    },
    addStudent() {
      newStudent = {
        name: this.studentName,
        group: this.studentGroup,
        isDonePr: this.studentPr,
      };
      Vue.axios
        .post("http://46.101.212.195:3000/students", newStudent)
        .then(({ data }) => this.students.push(data));
      this.studentName = this.studentGroup = "";
      this.studentPr = null;
    },
  },
};
</script>



<style scoped>
</style>