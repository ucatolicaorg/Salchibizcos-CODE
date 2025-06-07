import pandas as pd
import random
import tkinter as tk
from tkinter import ttk, messagebox
from datetime import datetime
import os

class AlgoritmoGenetico:
    def __init__(self, datos, niveles_obj, total_problemas, pop_size=50, max_generaciones=100, minimizar_tiempo=False):
        self.datos = datos
        self.niveles_obj = niveles_obj or {}
        self.total_obj = total_problemas
        self.pop_size = pop_size
        self.max_generaciones = max_generaciones
        self.minimizar_tiempo = minimizar_tiempo

    def fitness(self, individuo):
        tiempo = self.datos.loc[individuo]['Tiempo_promedio_resolucion'].sum()
        if not self.niveles_obj:
            return 1 / (1 + (tiempo if self.minimizar_tiempo else tiempo/1000))
        niveles = self.datos.loc[individuo]['Nivel_dificultad'].value_counts().to_dict()
        penalty = sum((niveles.get(n,0) - q)**2 for n,q in self.niveles_obj.items())
        if self.minimizar_tiempo:
            return 1 / (1 + penalty*1000 + tiempo)
        return 1 / (1 + penalty + tiempo/1000)

    def crear_individuo(self):
        if not self.niveles_obj:
            return random.sample(list(self.datos.index), k=self.total_obj)
        ind = []
        for nivel, cantidad in self.niveles_obj.items():
            pool = self.datos[self.datos['Nivel_dificultad']==nivel].index.tolist()
            if len(pool) < cantidad:
                ind.extend(pool)
                ind.extend(random.choices(pool, k=cantidad-len(pool)))
            else:
                ind.extend(random.sample(pool, cantidad))
        random.shuffle(ind)
        return ind

    def crear_poblacion(self):
        return [self.crear_individuo() for _ in range(self.pop_size)]

    def seleccion(self, poblacion, fitnesses):
        return random.choices(poblacion, weights=fitnesses, k=self.pop_size)

    def cruza(self, p1, p2):
        if not self.niveles_obj:
            mitad = self.total_obj // 2
            return random.sample(p1[:mitad] + p2[mitad:], self.total_obj)
        child = []
        for nivel, cnt in self.niveles_obj.items():
            g1 = [g for g in p1 if self.datos.at[g,'Nivel_dificultad']==nivel]
            g2 = [g for g in p2 if self.datos.at[g,'Nivel_dificultad']==nivel]
            take = g1[:cnt] + [g for g in g2 if g not in g1][:max(0,cnt-len(g1))]
            child.extend(take)
        random.shuffle(child)
        return child

    def mutacion(self, individuo):
        if len(individuo)>1 and random.random()<0.1:
            i,j = random.sample(range(len(individuo)),2)
            individuo[i], individuo[j] = individuo[j], individuo[i]
        return individuo

    def ejecutar(self):
        poblacion = self.crear_poblacion()
        for _ in range(self.max_generaciones):
            fits = [self.fitness(ind) for ind in poblacion]
            poblacion = self.seleccion(poblacion, fits)
            nueva = []
            for i in range(0,self.pop_size,2):
                nueva.append(self.mutacion(self.cruza(poblacion[i], poblacion[i+1])))
                nueva.append(self.mutacion(self.cruza(poblacion[i+1], poblacion[i])))
            poblacion = nueva
        mejor = max(poblacion, key=self.fitness)
        return self.datos.loc[mejor]

class InterfazMaraton:
    def __init__(self):
        self.root = tk.Tk()
        self.root.title("🎉 Generador de Maratón Avanzado 🏆")
        self.root.state('zoomed')
        self.df = self.generar_dataset()
        self.var_pocos = tk.StringVar(value="No")
        self.var_min = tk.StringVar(value="No")
        self.niveles = {}
        self.total_problemas = 0
        self.crear_interfaz()
        self.root.mainloop()

    def generar_dataset(self):
        num = 100
        niveles = [random.randint(1, 5) for _ in range(num)]
        tiempos = [round(min(120, 10 + random.uniform(0, nivel * 20)), 2) for nivel in niveles]
        return pd.DataFrame({
        'Nombre_problema': [f'🧠 problema{i+1}' for i in range(num)],
        'Nivel_dificultad': niveles,
        'Cantidad_veces_usado': [random.randint(1, 100) for _ in range(num)],
        'Tiempo_promedio_resolucion': tiempos
    }).set_index('Nombre_problema')

    def crear_interfaz(self):
        s=ttk.Style()
        s.configure('TLabel', background='#EDEDED', font=('Helvetica',14,'bold'), anchor='center', justify='center')
        s.configure('TButton', background='#FFD700', font=('Helvetica',12,'bold'))
        s.configure('TCheckbutton', background='#EDEDED', font=('Helvetica',12))
        s.configure('Treeview.Heading', font=('Helvetica',12,'bold'), anchor='center')
        s.configure('Treeview', font=('Helvetica',11), rowheight=25)
        
        self.root.configure(bg='#EDEDED')
        main=ttk.Frame(self.root,padding=30)
        main.pack(expand=True,fill=tk.BOTH)

        ttk.Label(main, text="📛 Nombre de la Maratón 📛", justify='center').grid(row=0, column=0, pady=10, sticky='ew')
        self.entry_nombre=ttk.Entry(main, width=30, justify='center')
        self.entry_nombre.grid(row=0, column=1, pady=10, sticky='ew')

        ttk.Label(main, text="📦 Total de problemas 📦", justify='center').grid(row=1, column=0, pady=10, sticky='ew')
        self.entry_total=ttk.Entry(main, width=10, justify='center')
        self.entry_total.grid(row=1, column=1, pady=10, sticky='ew')

        ttk.Button(main, text="📊 Ver Dataset", command=self.mostrar_dataset).grid(row=1, column=2, padx=10, pady=10)

        btn_cfg=ttk.Button(main, text="⚙️ Configurar Niveles", command=self.abrir_config)
        btn_cfg.grid(row=2, column=0, pady=15)

        ttk.Checkbutton(main, text="🕹️ Poco usados", variable=self.var_pocos, onvalue="Si", offvalue="No").grid(row=2, column=1, pady=15)
        ttk.Checkbutton(main, text="⌛ Minimizar Tiempo", variable=self.var_min, onvalue="Si", offvalue="No").grid(row=2, column=2, pady=15)

        ttk.Button(main, text="🚀 Generar GA 🚀", command=self.generar).grid(row=3, column=1, pady=25)

        # Column weight for responsive resizing and centered layout
        main.columnconfigure(0, weight=1)
        main.columnconfigure(1, weight=1)
        main.columnconfigure(2, weight=1)

    def mostrar_dataset(self):
        v=tk.Toplevel(self.root)
        v.title("Dataset")
        v.state('zoomed')
        cols=list(self.df.reset_index().columns)
        tree=ttk.Treeview(v, columns=cols, show='headings')
        for c in cols:
            tree.heading(c, text=c, anchor='center')
            tree.column(c, width=150, anchor='center')
        for _, r in self.df.reset_index().iterrows():
            tree.insert('', 'end', values=list(r))
        sb=ttk.Scrollbar(v, orient='vertical', command=tree.yview)
        tree.configure(yscrollcommand=sb.set)
        tree.pack(side='left', fill='both', expand=True)
        sb.pack(side='right', fill='y')

    def abrir_config(self):
        v = tk.Toplevel(self.root)
        v.title("🔧 Configurar Niveles 🔧")
        disp = self.df['Nivel_dificultad'].value_counts().sort_index()
        self.entries = {}
        for i in range(1, 6):
            f = ttk.Frame(v)
            f.pack(pady=5)
            ttk.Label(f, text=f"⏺ Nivel {i} disponibles: {disp.get(i, 0)} ⏺", justify='center').pack(side='left')
            e = ttk.Entry(f, width=5, justify='center')
            e.pack(side='left', padx=5)
            self.entries[i] = e
        ttk.Button(v, text="💾 Guardar Configuración 💾", command=self.save_config).pack(pady=10)

    def save_config(self):
        try:
            total = int(self.entry_total.get())
            self.total_problemas = total
            niveles = {lvl: int(e.get()) for lvl, e in self.entries.items() if e.get().isdigit()}
            if niveles and sum(niveles.values()) != total:
                messagebox.showerror("Error", "La suma de problemas por nivel debe ser igual al total.")
                return
            self.niveles = niveles
            messagebox.showinfo("Configuración guardada", "Niveles guardados correctamente.")
        except Exception as e:
            messagebox.showerror("Error", f"Revise los datos ingresados: {e}")

    def generar(self):
        nombre = self.entry_nombre.get().strip()
        if not nombre:
            messagebox.showerror("Error", "Ingrese un nombre para la maratón")
            return
        try:
            total = int(self.entry_total.get())
        except:
            messagebox.showerror("Error", "Ingrese un total válido")
            return
        if self.niveles and sum(self.niveles.values()) != total:
            messagebox.showerror("Error", "La suma de problemas por nivel debe coincidir con el total")
            return
        datos_filtrados = self.df
        if self.var_pocos.get() == "Si":
            threshold = self.df['Cantidad_veces_usado'].quantile(0.5)
            datos_filtrados = self.df[self.df['Cantidad_veces_usado'] <= threshold]
            if datos_filtrados.empty:
                messagebox.showwarning("Advertencia", "No hay problemas poco usados disponibles.")
                return
        ga = AlgoritmoGenetico(datos_filtrados, self.niveles, total,
                               minimizar_tiempo=(self.var_min.get()=="Si"))
        resultado = ga.ejecutar()
        resultado = resultado.reset_index()
        ventana = tk.Toplevel(self.root)
        ventana.title(f"🎯 Resultado Generado para {nombre} 🎯")
        ventana.state('zoomed')
        cols = list(resultado.columns)
        tree = ttk.Treeview(ventana, columns=cols, show='headings')
        for c in cols:
            tree.heading(c, text=c, anchor='center')
            tree.column(c, width=180, anchor='center')
        for _, row in resultado.iterrows():
            tree.insert('', 'end', values=list(row))
        sb = ttk.Scrollbar(ventana, orient='vertical', command=tree.yview)
        tree.configure(yscrollcommand=sb.set)
        tree.pack(side='left', fill='both', expand=True)
        sb.pack(side='right', fill='y')

        # Guardar la maratón generada en CSV
        ruta = 'maratones_guardadas.csv'
        fecha = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        info = {
            'Nombre': nombre,
            'Fecha': fecha,
            'Total_problemas': total,
            'Minimizar_tiempo': self.var_min.get(),
            'Poco_usados': self.var_pocos.get()
        }
        niveles_str = ",".join(f"Nivel{lvl}:{cant}" for lvl,cant in self.niveles.items()) if self.niveles else "Sin niveles"
        df_info = pd.DataFrame([{
            **info,
            'Niveles': niveles_str,
            'Problemas': ";".join(resultado['Nombre_problema'])
        }])
        if os.path.exists(ruta):
            df_info.to_csv(ruta, mode='a', index=False, header=False)
        else:
            df_info.to_csv(ruta, index=False)
        messagebox.showinfo("Guardado", f"Maratón '{nombre}' guardada correctamente.")

InterfazMaraton()