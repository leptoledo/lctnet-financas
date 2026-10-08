import { TimeToEarnConfig, TimeToEarnResult } from './types';

export const DEFAULT_TIME_TO_EARN_CONFIG: TimeToEarnConfig = {
  isEnabled: true,
  monthlyIncome: 6500, // compatível com o salário de seed
  weeklyWorkHours: 40,
  workDaysPerWeek: 5
};

/**
 * Calcula a taxa horária de trabalho do usuário.
 */
export function calculateHourlyRate(config: TimeToEarnConfig = DEFAULT_TIME_TO_EARN_CONFIG): number {
  if (config.monthlyIncome <= 0 || config.weeklyWorkHours <= 0) return 0;
  // Média de semanas por mês = 4.3333
  const monthlyWorkHours = config.weeklyWorkHours * (52 / 12);
  return config.monthlyIncome / monthlyWorkHours;
}

/**
 * Converte um valor monetário no tempo de trabalho necessário.
 * Fiel a UtilitiesTimeToEarnCalculator.swift
 */
export function calculateTimeToEarn(
  amount: number,
  config: TimeToEarnConfig = DEFAULT_TIME_TO_EARN_CONFIG
): TimeToEarnResult {
  const hourlyRate = calculateHourlyRate(config);
  if (hourlyRate <= 0 || amount <= 0) {
    return { hours: 0, minutes: 0, formattedString: '0min' };
  }

  const totalHours = amount / hourlyRate;
  const hours = Math.floor(totalHours);
  const minutes = Math.round((totalHours - hours) * 60);

  let formattedString = '';
  if (hours > 0 && minutes > 0) {
    formattedString = `${hours}h ${minutes}min de trabalho`;
  } else if (hours > 0) {
    formattedString = `${hours}h de trabalho`;
  } else {
    formattedString = `${minutes}min de trabalho`;
  }

  return {
    hours,
    minutes,
    formattedString
  };
}
