<template>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row
      justify="center"
      align="center"
    >
      <v-col lg="10" md="10" sm="12">
        <v-sheet>
          <v-toolbar flat>
            <v-btn
              color="grey darken-2"
              @click="setToday"
              small
              icon
            >
              <v-icon>mdi-calendar-today</v-icon>
            </v-btn>
            <v-btn
              icon
              small
              color="grey darken-2"
              @click="prev"
            >
              <v-icon>
                mdi-chevron-left
              </v-icon>
            </v-btn>
            <v-btn
            icon
              small
              color="grey darken-2"
              @click="next"
            >
              <v-icon>
                mdi-chevron-right
              </v-icon>
            </v-btn>
            <v-toolbar-title v-if="$refs.calendar">
              {{ $refs.calendar.title }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <tarea @Actualizar="cargarTareas"/>
            </v-btn>
            <v-menu
              bottom
              right
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  outlined
                  color="grey darken-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  <span>{{ typeToLabel[type] }}</span>
                  <v-icon right>
                    mdi-menu-down
                  </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="type = 'month'">
                  <v-list-item-title>Mes</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'day'">
                  <v-list-item-title>Día</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'week'">
                  <v-list-item-title>Semana</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = '4day'">
                  <v-list-item-title>4 días</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar>
        </v-sheet>
        <v-sheet height="600">
          <v-calendar
            ref="calendar"
            v-model="focus"
            color="primary"
            :events="events"
            :event-color="getEventColor"
            :type="type"
            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="viewDay"
            @change="updateRange"
          ></v-calendar>
          <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
          >
            <v-card
              color="grey lighten-4"
              min-width="350px"
              flat
            >
              <v-toolbar
                :color="selectedEvent.color"
                dark
              >
                <v-btn icon>
                  <!-- <v-icon>mdi-pencil</v-icon> -->
                  <eliminar
                    :tarea="selectedEvent"
                    @Actualizar="cargarTareas"
                  />
                </v-btn>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <span v-html="selectedEvent.details"></span>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  text
                  color="secondary"
                  @click="selectedOpen = false"
                >
                  cerrar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Eliminar from "@/components/functions/EliminarTarea.vue";
import Tarea from "@/components/functions/Tarea.vue";
import { mapActions } from "vuex";
export default {
  components: {
    Eliminar,
    Tarea,
  },
  data: () => ({
    tareas: [],
    focus: "",
    type: "month",
    typeToLabel: {
      month: "Mes",
      week: "Semana",
      day: "Día",
      "4day": "4 días",
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1",
    ],
    names: [
      "Meeting",
      "Holiday",
      "PTO",
      "Travel",
      "Event",
      "Birthday",
      "Conference",
      "Party",
    ],
  }),
  mounted() {
    this.$refs.calendar.checkChange();
    this.cargarTareas();
  },
  methods: {
    ...mapActions("tarea", ["obtenerTareas"]),
    async cargarTareas() {
      this.selectedOpen = false;
      let res = await this.obtenerTareas();
      if (!res) {
        return;
      }
      this.tareas = res;
      this.updateRange();
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
      this.cargarTareas();
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => {
          this.selectedOpen = true;
        }, 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    updateRange() {
      const events = [];
      let resultado = this.tareas;
      for (let i = 0; i < resultado.length; i++) {
        const s = new Date(resultado[i].fecha_inicio).getTime();
        const f = new Date(resultado[i].fecha_fin).getTime();
        events.push({
          id_registro: resultado[i].id_registro,
          name: resultado[i].titulo,
          start: new Date(s),
          end: new Date(f),
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: true,
          details: resultado[i].descripcion,
        });
      }
      this.events = events;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
  },
};
</script>