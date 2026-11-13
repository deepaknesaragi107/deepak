import { ReportAnalysis } from '../types/report';

export const SAMPLE_REPORTS: ReportAnalysis[] = [
  {
    id: 'sample-cbc-1',
    report_title: 'Complete Blood Count (CBC) Panel',
    patient_name: 'Priya Sharma (Sample)',
    report_date: 'October 24, 2026',
    lab_name: 'Metropolis Diagnostic Laboratories',
    summary:
      'Overall, your blood report shows healthy white blood cell counts and normal blood-clotting platelets. However, your hemoglobin and red blood cell size (MCV) are slightly below the expected reference intervals. This pattern is commonly seen in mild iron deficiency and is a great topic to discuss with your doctor.',
    key_findings: [
      'Hemoglobin is 10.8 g/dL (reference: 12.0–15.5 g/dL) — mildly low.',
      'MCV (average red blood cell size) is 76 fL (reference: 80–100 fL) — indicating smaller cells.',
      'White blood cell count (6,400 cells/mcL) is in the ideal normal zone, indicating no acute infection.',
      'Platelet count (260,000 /mcL) is healthy and supportive of normal blood clotting.',
    ],
    categories: [
      {
        category_name: 'Red Blood Cells & Oxygen Transport',
        parameters: [
          {
            name: 'Hemoglobin (Hb)',
            value: '10.8',
            unit: 'g/dL',
            reference_range: '12.0 - 15.5 g/dL',
            status: 'low',
            simple_explanation:
              'Hemoglobin is the iron-rich protein in red blood cells that carries oxygen from your lungs to the rest of your body.',
            what_this_value_means:
              'Your level is slightly lower than usual. When hemoglobin is mild-to-moderately low, your body has to work a bit harder to circulate oxygen, which can cause you to feel tired or cold.',
            lifestyle_tips: [
              'Ask your doctor if you should test your serum ferritin (iron stores).',
              'Include iron-rich foods in your meals, such as lentils, spinach, chickpeas, beans, and seeds.',
              'Pair plant-based iron foods with Vitamin C (like bell peppers or lemon juice) to enhance absorption.',
            ],
          },
          {
            name: 'Mean Corpuscular Volume (MCV)',
            value: '76.0',
            unit: 'fL',
            reference_range: '80.0 - 100.0 fL',
            status: 'low',
            simple_explanation:
              'MCV measures the physical volume (size) of your individual red blood cells.',
            what_this_value_means:
              'Your red blood cells are somewhat smaller than standard (microcytic). Along with a lower hemoglobin, this is a classic marker doctors check when investigating nutritional iron.',
            lifestyle_tips: [
              'Mention this value to your physician so they can differentiate between dietary iron and other traits.',
            ],
          },
          {
            name: 'Total Red Blood Cell Count (RBC)',
            value: '4.15',
            unit: 'million/mcL',
            reference_range: '4.00 - 5.20 million/mcL',
            status: 'normal',
            simple_explanation:
              'The total number of red blood cells circulating in your bloodstream.',
            what_this_value_means:
              'The total cell count is within the healthy reference bracket.',
            lifestyle_tips: ['Maintain balanced daily hydration.'],
          },
        ],
      },
      {
        category_name: 'Immune & Clotting Biomarkers',
        parameters: [
          {
            name: 'White Blood Cell Count (WBC)',
            value: '6,400',
            unit: 'cells/mcL',
            reference_range: '4,500 - 11,000 cells/mcL',
            status: 'normal',
            simple_explanation:
              'White blood cells are your body’s frontline defense against bacteria, viruses, and inflammation.',
            what_this_value_means:
              'Your immune cells are at a balanced, healthy baseline, with no signs of active systemic inflammation or infection.',
            lifestyle_tips: ['Continue prioritizing 7-8 hours of quality sleep.'],
          },
          {
            name: 'Platelet Count',
            value: '260,000',
            unit: '/mcL',
            reference_range: '150,000 - 450,000 /mcL',
            status: 'normal',
            simple_explanation:
              'Platelets are tiny disk-shaped cell fragments that bundle together to stop bleeding when you get a cut.',
            what_this_value_means:
              'Your clotting reserve is in the optimal standard range.',
            lifestyle_tips: ['No special action needed; your result is stable.'],
          },
        ],
      },
    ],
    questions_for_doctor: [
      'Given my hemoglobin of 10.8 and lower MCV, would you recommend checking my serum ferritin or iron profile?',
      'Could my low hemoglobin explain recent feelings of fatigue, low energy, or lightheadedness?',
      'Do you suggest starting an iron supplement or focusing first on dietary iron sources?',
      'When should I schedule a repeat CBC test to check if my numbers have recovered?',
    ],
    educational_disclaimer:
      'ReportSaathi is an educational demonstration tool. It does not provide medical diagnoses or treatment recommendations. Always discuss your lab results with a qualified healthcare professional.',
    extraction_method: 'client_demo_simulation',
  },
  {
    id: 'sample-lipid-2',
    report_title: 'Metabolic & Cardiovascular Lipid Profile',
    patient_name: 'Anil Kumar (Sample)',
    report_date: 'November 02, 2026',
    lab_name: 'HealthQuest Pathology',
    summary:
      'Your metabolic panel demonstrates great kidney function and a healthy resting heart lipid ratio. However, your Total Cholesterol and LDL ("bad cholesterol") are moderately elevated, and fasting glucose is slightly above the strict 100 mg/dL baseline. These are very common lifestyle markers that respond well to nutrition and physical activity.',
    key_findings: [
      'Total Cholesterol is 218 mg/dL (desirable: < 200 mg/dL) — mildly elevated.',
      'LDL Cholesterol is 142 mg/dL (optimal: < 100 mg/dL) — higher than target range.',
      'Fasting Blood Sugar is 104 mg/dL (normal: 70–99 mg/dL) — borderline/impaired fasting glucose.',
      'Kidney marker eGFR (> 90 mL/min) and Liver enzyme ALT (26 U/L) are completely normal.',
    ],
    categories: [
      {
        category_name: 'Cholesterol & Lipid Fractionation',
        parameters: [
          {
            name: 'Total Cholesterol',
            value: '218',
            unit: 'mg/dL',
            reference_range: '< 200 mg/dL',
            status: 'borderline',
            simple_explanation:
              'A cumulative measure of all cholesterol fractions (LDL, HDL, and VLDL) traveling in your bloodstream.',
            what_this_value_means:
              'Slightly over the desirable 200 mg/dL threshold. In modern medicine, doctors look closely at the ratio between protective and non-protective cholesterol rather than total alone.',
            lifestyle_tips: [
              'Incorporate soluble fiber into breakfast (such as steel-cut oats, chia seeds, or apples).',
              'Aim for 150 minutes of moderate aerobic exercise (brisk walking, swimming, cycling) per week.',
            ],
          },
          {
            name: 'LDL Cholesterol ("Bad" Cholesterol)',
            value: '142',
            unit: 'mg/dL',
            reference_range: '< 100 mg/dL',
            status: 'high',
            simple_explanation:
              'Low-Density Lipoprotein carries cholesterol to your tissues. High amounts can gradually form fatty deposits along artery walls.',
            what_this_value_means:
              'At 142 mg/dL, this value is above standard targets. Your doctor will assess this in context with blood pressure, family history, and age.',
            lifestyle_tips: [
              'Reduce trans fats and saturated fats from fried snacks and heavily processed foods.',
              'Substitute butter and tropical oils with heart-healthy monounsaturated fats like olive oil.',
            ],
          },
          {
            name: 'HDL Cholesterol ("Good" Cholesterol)',
            value: '49',
            unit: 'mg/dL',
            reference_range: '> 40 mg/dL (Men) / > 50 mg/dL (Women)',
            status: 'normal',
            simple_explanation:
              'High-Density Lipoprotein sweeps excess cholesterol away from blood vessels and returns it to your liver for processing.',
            what_this_value_means:
              'Your protective cholesterol is at an acceptable level.',
            lifestyle_tips: ['Regular aerobic physical activity helps elevate protective HDL.'],
          },
          {
            name: 'Triglycerides',
            value: '165',
            unit: 'mg/dL',
            reference_range: '< 150 mg/dL',
            status: 'borderline',
            simple_explanation:
              'Triglycerides are the main type of fat in your body, derived from surplus calories, refined carbs, and sugar.',
            what_this_value_means:
              'Mildly above the optimal 150 cutoff. Often reflects dietary carbohydrate intake or evening eating patterns.',
            lifestyle_tips: [
              'Moderate refined sugars, sweetened beverages, and simple starches.',
            ],
          },
        ],
      },
      {
        category_name: 'Blood Sugar & Organ Function',
        parameters: [
          {
            name: 'Fasting Blood Glucose',
            value: '104',
            unit: 'mg/dL',
            reference_range: '70 - 99 mg/dL',
            status: 'borderline',
            simple_explanation:
              'The amount of sugar (glucose) present in your blood after an overnight fast of 8 to 12 hours.',
            what_this_value_means:
              '104 mg/dL sits in the borderline range (100–125 mg/dL). A single fasting reading can fluctuate; your physician might order an HbA1c test for a 3-month average.',
            lifestyle_tips: [
              'Take a 10-15 minute walk after meals to help muscles absorb circulating glucose naturally.',
              'Choose whole grains with complex fibers instead of refined white flours.',
            ],
          },
        ],
      },
    ],
    questions_for_doctor: [
      'Considering my LDL is 142 mg/dL, what is your recommended target range for someone with my overall health profile?',
      'Since my fasting glucose is 104 mg/dL, would you recommend testing my HbA1c to get a 3-month blood sugar average?',
      'Can we try lifestyle and dietary modifications for 3 to 6 months before considering medications?',
      'Are there specific cardiovascular screening tests you recommend I track annually?',
    ],
    educational_disclaimer:
      'ReportSaathi is an educational demonstration tool. It does not provide medical diagnoses or treatment recommendations. Always discuss your lab results with a qualified healthcare professional.',
    extraction_method: 'client_demo_simulation',
  },
  {
    id: 'sample-thyroid-3',
    report_title: 'Thyroid Stimulating Hormone & Vitamin Panel',
    patient_name: 'Sunita Rao (Sample)',
    report_date: 'November 08, 2026',
    lab_name: 'Apollo Diagnostics',
    summary:
      'This report shows that while your active Free T4 thyroid hormone and Vitamin B12 are within normal limits, your TSH is mildly elevated and Vitamin D is significantly low. Mild TSH elevations can signal an underactive thyroid early on, while low Vitamin D is extremely common and easily treated under medical guidance.',
    key_findings: [
      'TSH (Thyroid Stimulating Hormone) is 4.85 mIU/L (reference: 0.40–4.50 mIU/L) — mildly high.',
      'Free T4 is 1.15 ng/dL (reference: 0.8–1.8 ng/dL) — healthy and normal.',
      'Vitamin D (25-OH) is 16.2 ng/mL (optimal: 30–100 ng/mL) — deficiency status.',
      'Vitamin B12 is 380 pg/mL (normal: 200–900 pg/mL) — normal reserve.',
    ],
    categories: [
      {
        category_name: 'Thyroid Function Evaluation',
        parameters: [
          {
            name: 'TSH (Thyroid Stimulating Hormone)',
            value: '4.85',
            unit: 'mIU/L',
            reference_range: '0.40 - 4.50 mIU/L',
            status: 'high',
            simple_explanation:
              'TSH is released by your brain’s pituitary gland to prompt your thyroid to produce metabolic hormones.',
            what_this_value_means:
              'When TSH is slightly high while Free T4 is normal, doctors call this "subclinical hypothyroidism." Your brain is shouting a bit louder to encourage your thyroid to keep up.',
            lifestyle_tips: [
              'Ask your doctor if you should retest TSH in 6–8 weeks to confirm if the elevation is persistent.',
              'Ensure adequate dietary iodine and selenium from eggs, nuts, and iodized salt.',
            ],
          },
          {
            name: 'Free T4 (Thyroxine)',
            value: '1.15',
            unit: 'ng/dL',
            reference_range: '0.80 - 1.80 ng/dL',
            status: 'normal',
            simple_explanation:
              'The actual active circulating thyroid hormone available to regulate your metabolism and energy.',
            what_this_value_means:
              'Your circulating hormone level is currently adequate and maintaining metabolic function.',
            lifestyle_tips: ['No immediate medication needed for normal Free T4.'],
          },
        ],
      },
      {
        category_name: 'Micronutrients & Vitamins',
        parameters: [
          {
            name: 'Vitamin D (25-Hydroxy)',
            value: '16.2',
            unit: 'ng/mL',
            reference_range: '30.0 - 100.0 ng/mL',
            status: 'low',
            simple_explanation:
              'Vitamin D is a crucial fat-soluble nutrient that aids calcium absorption for bone strength and regulates immune health.',
            what_this_value_means:
              'At 16.2 ng/mL, your body is below the recommended 30 ng/mL threshold. This can contribute to bone ache, muscle weakness, or low mood.',
            lifestyle_tips: [
              'Ask your physician for an appropriate prescription dosage (e.g., weekly D3 therapy).',
              'Aim for 10-15 minutes of safe midday sunlight exposure on arms or legs when possible.',
            ],
          },
        ],
      },
    ],
    questions_for_doctor: [
      'My TSH is 4.85 with normal Free T4. Do you recommend monitoring this, or testing thyroid antibodies (Anti-TPO)?',
      'Could my low Vitamin D (16.2 ng/mL) be contributing to any muscle aches or fatigue?',
      'What specific Vitamin D3 supplement regimen and strength do you prescribe to safely restore my levels?',
      'When should we re-check both my TSH and Vitamin D levels?',
    ],
    educational_disclaimer:
      'ReportSaathi is an educational demonstration tool. It does not provide medical diagnoses or treatment recommendations. Always discuss your lab results with a qualified healthcare professional.',
    extraction_method: 'client_demo_simulation',
  },
];

